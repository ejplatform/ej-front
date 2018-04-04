import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ProfileService } from './services/profile.service';
import { NotificationService } from './services/notification.service';
import { NotificationInfo } from './models/notification-info';
import { Profile } from './models/profile';
import { GlobalState } from './global.state';
import { environment } from '../environments/environment';
import * as _ from 'lodash';
import * as Raven from 'raven-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Angulartics2GoogleAnalytics, NotificationService],
})
export class AppComponent implements OnInit  {

  title = 'app';
  profile: Profile;
  isMenuCollapsed = false;
  alreadeyCollapsed = false;

  constructor(private _state: GlobalState, private translate: TranslateService,
    private profileService: ProfileService, private router: Router,
    public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private notificationService: NotificationService) {
    translate.setDefaultLang('pt');
    translate.use('pt');

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      if (!this.isMenuCollapsed && isCollapsed) {
        this.alreadeyCollapsed = false;

      } else {
        this.alreadeyCollapsed = true;
      }
      this.isMenuCollapsed = isCollapsed;
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // FIXME use this: https://github.com/zefoy/ngx-perfect-scrollbar
        window.scrollTo(0, 0);
      }
    });

  }

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();
    this.sentryUserData(this.profile);

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
      this.sentryUserData(profile);
    });

    // Register the OneSignal app
    const OneSignal = window['OneSignal'] || [];

    OneSignal.push(['init', {
      appId: environment.onSignalAppId,
      autoRegister: true,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false
      }
    }]);

    OneSignal.push(['registerForPushNotifications']);

    const that = this;

    OneSignal.push(function () {
      // Occurs when the user's subscription changes to a new value.
      OneSignal.on('subscriptionChange', function (isSubscribed) {
        console.log('The user\'s subscription state is now:', isSubscribed);
        if (isSubscribed) {
          OneSignal.getUserId().then(function (userId) {
            console.log('User ID is', userId);

            // Save the user ID in local storage for future reference
            const notificationInfo = new NotificationInfo();
            notificationInfo.oneSignalAppId = userId;
            that.notificationService.saveInfo(notificationInfo);

            // Save the user email in OneSignal, if it's available
            if (that.profile && that.profile.id) {
              that.notificationService.sendHashedEmail(that.profile.email);
              that.notificationService.sendOneSignalId(userId);
            }
          });
        }
      });
    });
  }

  isLogged() {
    return _.isObject(this.profile) && this.profile.id;
  }

  hideNavigationBar(e, isCollapsed) {
    if (window.innerWidth > NavigationBarComponent.MAX_SIZE_FOR_AUTOMATIC_TOGGLE ) {
      return false;
    }


    if (this.alreadeyCollapsed && isCollapsed) {
      this.isMenuCollapsed = !this.isMenuCollapsed;

      this.alreadeyCollapsed = true;
      this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }
    this.alreadeyCollapsed = !this.alreadeyCollapsed;
  }

  sentryUserData(profile) {
    // Prepare user data to be sent to Sentry in case of an error
    if (profile && profile.id) {
      Raven.setUserContext({
        id: profile.id,
        username: profile.username,
        email: profile.email
      });
    } else {
      Raven.setUserContext();
    }
  }
}

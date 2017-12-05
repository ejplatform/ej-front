import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/profile';
import { GlobalState } from './global.state';
import { environment } from '../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProfileService],
})
export class AppComponent implements OnInit  {

  title = 'app';
  profile: Profile;
  isMenuCollapsed: boolean = false;
  alreadeyCollapsed: boolean = false;

  constructor(private _state: GlobalState, private translate: TranslateService,
    private profileService: ProfileService, private router: Router) {
    translate.setDefaultLang('pt');
    translate.use('pt');

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      if(!this.isMenuCollapsed && isCollapsed){
        this.alreadeyCollapsed = false;

      }else{
        this.alreadeyCollapsed = true;
      }
      this.isMenuCollapsed = isCollapsed;
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        // FIXME use this: https://github.com/zefoy/ngx-perfect-scrollbar
        window.scrollTo(0,0);
      }
    });

  }

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

    // Register the OneSignal app
    const OneSignal = window['OneSignal'] || [];
    console.log('Init OneSignal');

    OneSignal.push(['init', {
      // TODO: this ID should come from an environment
      appId: environment.onSignalAppId,
      autoRegister: true,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: true
      }
    }]);

    console.log('OneSignal Initialized');
    OneSignal.push(function () {
      console.log('Register For Push');
      OneSignal.push(['registerForPushNotifications']);
    });

    OneSignal.push(function () {
      // Occurs when the user's subscription changes to a new value.
      OneSignal.on('subscriptionChange', function (isSubscribed) {
        console.log('The user\'s subscription state is now:', isSubscribed);
        if (isSubscribed) {
          OneSignal.getUserId().then(function (userId) {
            console.log('User ID is', userId);
          });
        }
      });

    });

  }

  isLogged(){
    return _.isObject(this.profile);
  }

  hideNavigationBar(e, isCollapsed){
    if(window.innerWidth > NavigationBarComponent.MAX_SIZE_FOR_AUTOMATIC_TOGGLE)
      return false

    if(this.alreadeyCollapsed && isCollapsed){
      this.isMenuCollapsed = !this.isMenuCollapsed;

      this.alreadeyCollapsed = true;
      this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }
    this.alreadeyCollapsed = !this.alreadeyCollapsed;
  }
}

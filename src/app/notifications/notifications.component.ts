import { Component, OnInit, Input, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { ProfileService } from '../services/profile.service';
import { NotificationService } from '../services/notification.service';

import { Profile } from '../models/profile';
import { GlobalState } from '../global.state';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  providers: [NotificationService],
})
export class NotificationsComponent implements OnInit {

  @Input() profile: Profile;
  alerts = [];
  isCollapsed = true;
  alertsLoaded = false;
  unreadCount = -1;

  constructor(private _state: GlobalState, private profileService: ProfileService, private notificationService: NotificationService) {

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

    // get user-notifications now
    this.notificationService.list().subscribe((user_notifications) => {
      this.alerts = user_notifications;
      this.alertsLoaded = true;

      let count = 0;
      this.alerts.forEach((notification) => {
        if (notification.status !== 'read') {
          count++;
        }
      });
      this.unreadCount = count;
    }, error => {
      // handle request errors here
    });
  }

  ngOnInit() {
  }

  toggleAlerts($event: any) {
    this.unreadCount = 0;
    this.isCollapsed = !this.isCollapsed;
    $event.preventDefault();
    $event.stopPropagation();
    return false;
  }

  @HostListener('document:click', ['$event']) onClick(event): void {
    this.isCollapsed = true;
  }
}

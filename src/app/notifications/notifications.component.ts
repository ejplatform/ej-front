import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash'
import { ProfileService } from '../services/profile.service';
import { NotificationService } from '../services/notification.service';

import { Profile } from '../models/profile';
import { GlobalState } from '../global.state';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [NotificationService],
})
export class NotificationsComponent implements OnInit {

  @Input() profile: Profile;
  alerts = [];
  isCollapsed = false;

  constructor(private _state: GlobalState, private profileService: ProfileService, private notificationService: NotificationService) {

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

    // get user-notifications now
    this.notificationService.list().subscribe((user_notifications) => {
      this.alerts = user_notifications;
    });
  }

  ngOnInit() {
  }


  toggleAlerts() {
    this.isCollapsed = !this.isCollapsed;
    return false;
  }

}

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
    // FIXME uncoment this code after notifications endpoint is ready
    // this.alertService.list().subscribe((alerts) => {
    //   this.alerts = alerts;
    // });
    this.alerts = [
      { id: 1, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 2, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 3, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 4, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 5, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 6, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 7, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 8, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 9, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 10, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 11, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' },
      { id: 12, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item' }
    ]
  }

  ngOnInit() {
  }


  toggleAlerts() {
    this.isCollapsed = !this.isCollapsed;
    return false;
  }

}

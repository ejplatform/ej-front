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
    this.alerts = [{id: 1, body: 'notificacao 1', title: 'titulo 1'}, {id: 2, body: 'notificacao 2', title: 'titulo 1'}, {id: 3, body: 'notificacao 3', title: 'titulo 1'}]
    
  }

  ngOnInit() {
  }


  toggleAlerts() {
    this.isCollapsed = !this.isCollapsed;
    return false;
  }

}

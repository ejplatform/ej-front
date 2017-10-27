import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash' 
import { ProfileService } from '../services/profile.service';
import { AlertService } from '../services/alert.service';

import { Profile } from '../models/profile';
import { GlobalState } from '../global.state';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  providers: [AlertService],
})
export class AlertsComponent implements OnInit {

  @Input() profile: Profile;
  alerts = [];
  isAlertsCollapsed = false;

  constructor(private _state: GlobalState, private profileService: ProfileService, private alertService: AlertService) {

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

    this.alertService.list().subscribe((alerts) => {
      this.alerts = alerts;
    });
    this.alerts = [{id: 1, body: 'notificacao 1'}, {id: 2, body: 'notificacao 2'}, {id: 3, body: 'notificacao 3'}]
    
  }

  ngOnInit() {
  }


  toggleAlerts() {
    this.isAlertsCollapsed = !this.isAlertsCollapsed;
    return false;
  }

}

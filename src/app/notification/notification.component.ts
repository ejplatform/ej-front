import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash' 
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { NotificationService } from '../services/notification.service';
import { Profile } from '../models/profile';
import { Notification } from '../models/notification';
import { GlobalState } from '../global.state';
import { NgModel } from '@angular/forms'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [NotificationService],
})
export class NotificationComponent implements OnInit {

  @Input() profile: Profile;
  @Input() notification: Notification;

  search: string;
  displayOnlyUnread: boolean;
  
  alerts = [];

  constructor(private _state: GlobalState, private profileService: ProfileService, private notificationService: NotificationService,
              private route: ActivatedRoute, private _changeDetectionRef : ChangeDetectorRef) {

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

    // FIXME Load notifications from the API 
    this.alerts = [
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 1, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 1' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: true, display: true, id: 2, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 2' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 3, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 3' },
      { image: null, date: '16/10/2016', read: false, display: true, id: 4, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 4' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 5, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 5' },
      { image: null, date: '16/10/2016', read: true, display: true, id: 6, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 6' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 7, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 7' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 8, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 8' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 9, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 9' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 10, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 10' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 11, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 11' },
      { image: 'http://ca.ios.ba/files/others/sea.jpg', date: '16/10/2016', read: false, display: true, id: 12, body: 'Secondary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.', title: 'Three-line item 12' }
    ]

    this.route.params.subscribe(params => {
      this.setActive(params.id);
    });
  }

  ngAfterViewInit(){
    this._changeDetectionRef.detectChanges();
  }

  ngOnInit() {
    this.search = '';
    this.displayOnlyUnread = false;
  }

  setActive(id) {
    let currentNotification = this.alerts[0];
    this.alerts.forEach((notification) => {
      if (notification.id == id) {
        currentNotification = notification;
      }
    });
    this.notification = currentNotification;
  }

  filterByString() {
    this.filter();
  }

  toggleUnread() {
    this.filter();
  }

  filter() {
    let alerts = this.alerts.slice(0);
    alerts.forEach((notification) => {
      if (notification.title.indexOf(this.search) > -1 || notification.body.indexOf(this.search) > -1) {
        notification.display = true;

        if (this.displayOnlyUnread && notification.read) {
          notification.display = false;
        }
      }
      else {
        notification.display = false;
      }
    });
    this.alerts = alerts;
  }
}

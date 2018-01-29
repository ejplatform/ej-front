import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

import { environment } from '../../environments/environment';
import { UserNotification } from '../models/user-notification';
import { NotificationInfo } from '../models/notification-info';
import { ProfileService } from './profile.service';

import 'rxjs/add/observable/empty';

@Injectable()
export class NotificationService {

  constructor (private http: HttpClient, private localStorageService: LocalStorageService,
    private profileService: ProfileService) {

    // Listen for profile changes
    this.profileService.profileChangeEvent.subscribe(profile => {
      // Save the email as a hash in the onesignal profile
      if (profile) {
        this.sendHashedEmail(profile.email);

      // Save the onsesignal userId, if available, in the API backend
      const notificationInfo = this.getInfo();
        if (notificationInfo) {
          this.sendOneSignalId(notificationInfo.oneSignalAppId);
        }
      }
    });
  }

    list(): Observable<UserNotification[]> {
      const fullEndpointUrl = `${environment.apiUrl}/api/user-notifications/`;
      return this.http.get<UserNotification[]>(fullEndpointUrl);
    }

    markAsRead(id: number): Observable<any> {
      const fullEndpointUrl = `${environment.apiUrl}/api/user-notifications/${id}/read/`;
      return this.http.post(fullEndpointUrl, {}, { responseType: 'text' });
    }

    saveInfo(info: NotificationInfo): void {
      this.localStorageService.store('notificationInfo', info);
    }

    getInfo(): NotificationInfo {
      return this.localStorageService.retrieve('notificationInfo');
    }

    sendHashedEmail(email: string) {
      // get a reference to the OneSignal SDK initialized on the index.html
      const OneSignal = window['OneSignal'] || [];

      OneSignal.push(function() {
        OneSignal.syncHashedEmail(email);
      });
    }

    sendOneSignalId(notificationId: string) {
      const fullEndpointUrl = `${environment.apiUrl}/api/onesignal/profile/`;

      return this.http.post<NotificationInfo>(fullEndpointUrl, {
        onesignal_id: notificationId
      }).subscribe();
    }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Notification } from '../models/notification';

@Injectable()
export class NotificationService {

  constructor (private http: HttpClient) {}

    list(): Observable<Notification[]> {
      return this.http.get<Notification[]>('/api/notifications/');
    }

}

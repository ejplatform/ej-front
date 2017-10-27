import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Alert } from '../models/alert';

@Injectable()
export class AlertService {

  constructor (private http: HttpClient) {}

    list(): Observable<Alert[]> {
      return this.http.get<Alert[]>('/api/notifications/');
    }

}

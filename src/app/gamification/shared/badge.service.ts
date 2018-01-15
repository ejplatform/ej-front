import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../.././../environments/environment';

@Injectable()
export class BadgeService {

    constructor (private http: HttpClient) {}

    public list(): Observable<Comment[]> {
        let fullEndpointUrl = `${environment.apiUrl}/api/gamification/badges/`;
        return this.http.get<any[]>(fullEndpointUrl);
      }
}

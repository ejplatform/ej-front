import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Conversation } from '../models/conversation';

@Injectable()
export class ConversationService {

  constructor (private http: HttpClient) {}

    list(): Observable<Conversation[]> {
      let fullEndpointUrl = environment.apiUrl + '/api/conversations/';
      return this.http.get<Conversation[]>(fullEndpointUrl);
    }

    get(id: number): Observable<Conversation> {
      let fullEndpointUrl = environment.apiUrl + '/api/conversations/'  + id + '/';
      return this.http.get<Conversation>(fullEndpointUrl);
    }

}

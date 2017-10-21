import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Conversation } from '../models/conversation';

@Injectable()
export class ConversationService {

  constructor (private http: HttpClient) {}

    list(): Observable<Conversation[]> {
      return this.http.get<Conversation[]>('/api/conversations/');
    }

}

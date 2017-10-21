import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Conversation } from '../models/conversation';

@Injectable()
export class ConversationService {

  constructor () {}

    list(): Observable<Conversation[]> {
      return Observable.of([]);
    }

}

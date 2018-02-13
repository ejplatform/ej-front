import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Conversation } from '../models/conversation';
import { Comment } from '../comments/shared/comment.model';

@Injectable()
export class ConversationService {

  constructor (private http: HttpClient) {}

    list(): Observable<Conversation[]> {
      let fullEndpointUrl = environment.apiUrl + '/api/conversations/';
      return this.http.get<Conversation[]>(fullEndpointUrl);
    }

    random(): Observable<Conversation> {
      let fullEndpointUrl = environment.apiUrl + '/api/random-conversation/';
      return this.http.get<Conversation>(fullEndpointUrl);
    }

    promoted(): Observable<Conversation[]> {
      let fullEndpointUrl = environment.apiUrl + '/api/conversations/?promoted=true';
      return this.http.get<Conversation[]>(fullEndpointUrl);
    }

    get(slug: string): Observable<Conversation> {
      let fullEndpointUrl = environment.apiUrl + '/api/conversations/'  + slug + '/';
      return this.http.get<Conversation>(fullEndpointUrl);
    }

    getNextUnvotedComment(id: number): Observable<Comment> {
      let fullEndpointUrl = environment.apiUrl + '/api/next_comment/' + id + '/';
      return this.http.get<Comment>(fullEndpointUrl);
    }
}

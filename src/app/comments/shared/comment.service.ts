import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as _ from 'lodash'

import { environment } from '../../../environments/environment';
import { Comment } from './comment.model';

@Injectable()
export class CommentService {

  constructor (private http: HttpClient) {}

  public list(): Observable<Comment[]> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/`;
    return this.http.get<Comment[]>(fullEndpointUrl);
  }

  public getByConversationId(conversationId: number): Observable<Comment[]> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/?conversation__id=${conversationId}`;
    return this.http.get<Comment[]>(fullEndpointUrl);
  }

  public getByPolisId(polisId: number, conversationId: number): Observable<Comment[]> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/?polis_id=${polisId}&conversation__id=${conversationId}`;
    return this.http.get<Comment[]>(fullEndpointUrl);
  }

  public create(comment: Comment): Observable<Comment> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/`;
    return this.http.post<Comment>(fullEndpointUrl, comment);
  }

  public polisCreate(text: string, conversationId: string, profileId: number): Observable<any> {
    const fullEndpointUrl = `https://polis.brasilqueopovoquer.org.br/api/v3/comments`;

    const data = {
      'txt': text,
      'pid': 'mypid',
      'conversation_id': conversationId,
      'vote': -1,
      'agid': 1,
      'xid': String(profileId),
    };

    return this.http.post(fullEndpointUrl, data);
  }

  save(comment: Comment): Observable<Comment> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/${comment.id}/`;
    return this.http.put<Comment>(fullEndpointUrl, comment);
  }

}

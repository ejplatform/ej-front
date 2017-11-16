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

  public getByPolisId(polisId: number, conversationId: number): Observable<Comment[]> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/?polis_id=${polisId}&conversation__id=${conversationId}`;
    return this.http.get<Comment[]>(fullEndpointUrl);
  }

  public create(comment: Comment): Observable<Comment> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/`;
    return this.http.post<Comment>(fullEndpointUrl, comment);
  }

  save(comment: Comment): Observable<Comment> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/${comment.id}/`;
    return this.http.put<Comment>(fullEndpointUrl, comment);
  }

}

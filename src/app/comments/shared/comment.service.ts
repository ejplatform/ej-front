import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as _ from 'lodash' 

import { environment } from '../../../environments/environment';
import { Comment } from './comment.model';
import { CommentList } from './comment-list.model';

@Injectable()
export class CommentService {

  constructor (private http: HttpClient) {}

  public list(): Observable<Comment[]> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/`;
    return this.http.get<Comment[]>(fullEndpointUrl);
  }

  public reports(params?: any): Observable<CommentList> {
    let Params = new HttpParams();
    
    if (!_.isObject(params)) {
      params = {};
    }
    Params = Params.append('page', (params['page'] || 1));
    Params = _.isUndefined(params.approval) ? Params : Params.append('approval',params['approval']);
    
    let fullEndpointUrl = `${environment.apiUrl}/api/comments_report/`;
    return this.http.get<CommentList>(fullEndpointUrl, { params: Params });
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
    let fullEndpointUrl = `${environment.apiUrl}/api/comments_report/${comment.id}/`;
    return this.http.put<Comment>(fullEndpointUrl, comment);
  }

}

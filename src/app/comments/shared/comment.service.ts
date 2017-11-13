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

  // public reports(params?: any): Observable<Comment[]> {
  //   let Params = new HttpParams();
    
  //   if (!_.isObject(params)) {
  //     params = {};
  //   }
  //   Params = Params.append('page', (params['page'] || 1));
  //   Params = Params.append('per_page', (params['per_page'] || 2));
    
  //   // params['page'] = params['page'] || 1;
  //   // params['per_page'] = params['per_page'] || 2;    
  //   let fullEndpointUrl = `${environment.apiUrl}/api/comments_report/`;
  //   return this.http.get<Comment[]>(fullEndpointUrl, { params: Params });
  // }

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

  // list (params?: any): Observable<Badge[]> {        
  //   if (!_.isObject(params)) {
  //     params = {};
  //   }

  //   params['page'] = params['page'] || 1;
  //   params['per_page'] = params['per_page'] || 4;    

  //   return this.restangular.all('badges').getList(params);
  // }

  public getByPolisId(polisId: number, conversationId: number): Observable<Comment[]> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/?polis_id=${polisId}&conversation__id=${conversationId}`;
    return this.http.get<Comment[]>(fullEndpointUrl);
  }

  public create(comment: Comment): Observable<Comment> {
    let fullEndpointUrl = `${environment.apiUrl}/api/comments/`;
    return this.http.post<Comment>(fullEndpointUrl, comment);
  }
}

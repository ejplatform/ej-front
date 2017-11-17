import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as _ from 'lodash' 

import { environment } from '../../../environments/environment';
import { CommentReport } from './comment-report.model';
import { CommentReportList } from './comment-report-list.model';

@Injectable()
export class CommentReportService {

  constructor (private http: HttpClient) {}


  public reports(params?: any): Observable<CommentReportList> {
    let Params = new HttpParams();
    
    if (!_.isObject(params)) {
      params = {};
    }
    Params = Params.append('page', (params['page'] || 1));
    Params = _.isUndefined(params.approval) ? Params : Params.append('approval',params['approval']);
    Params = _.isUndefined(params.conversation_id) ? Params : Params.append('conversation__id',params['conversation_id']);
    
    let fullEndpointUrl = `${environment.apiUrl}/api/comments-report/`;
    return this.http.get<CommentReportList>(fullEndpointUrl, { params: Params });
  }

  // save(commentReport: CommentReport): Observable<CommentReport> {
  //   let fullEndpointUrl = `${environment.apiUrl}/api/comments-report/${commentReport.id}/`;
  //   return this.http.put<CommentReport>(fullEndpointUrl, commentReport);
  // }

}

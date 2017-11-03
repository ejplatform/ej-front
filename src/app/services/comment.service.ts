import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService {

  constructor (private http: HttpClient) {}

    list(): Observable<Comment[]> {
      let fullEndpointUrl = `${environment.apiUrl}/api/comments/`;
      return this.http.get<Comment[]>(fullEndpointUrl);
    }

    getByPolisId(polisId): Observable<Comment[]> {
      let fullEndpointUrl = `${environment.apiUrl}/api/comments/?polis_id=${polisId}`;
      return this.http.get<Comment[]>(fullEndpointUrl);
    }

    create(comment: Comment): Observable<Comment> {
      let fullEndpointUrl = `${environment.apiUrl}/api/comments/`;
      return this.http.post<Comment>(fullEndpointUrl, comment);
    }
}

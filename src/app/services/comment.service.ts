import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Comment } from '../models/comment';

@Injectable()
export class CommentService {

  constructor (private http: HttpClient) {}

    list(): Observable<Comment[]> {
      return this.http.get<Comment[]>('/api/comments/');
    }

}

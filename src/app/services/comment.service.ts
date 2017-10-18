import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Comment } from '../models/comment';

@Injectable()
export class CommentService {

  constructor () {}

    list (): Observable<Comment[]> {
      return Observable.of([]);
    }

}

import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable }     from 'rxjs/Observable';

import { Comment }     from '../models/comment';

@Injectable()
export class CommentsService {

  constructor (private restangular: Restangular) {}
  
    list (): Observable<Comment[]> {
      return this.restangular.all('comments').getList();
  
    }

}

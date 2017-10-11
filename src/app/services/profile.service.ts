import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable }     from 'rxjs/Observable';

import { Profile }     from '../models/profile';

@Injectable()
export class ProfileService {

  constructor (private restangular: Restangular) {}
  
    get(id: number): Observable<Profile> {
      return this.restangular.one('profiles', id).get();
  }

}

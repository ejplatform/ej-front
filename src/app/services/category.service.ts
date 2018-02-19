import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  constructor (private http: HttpClient) {}

    get(slug: string): Observable<Category> {
      let fullEndpointUrl = environment.apiUrl + '/api/categories/'  + slug + '/';
      return this.http.get<Category>(fullEndpointUrl);
    }
}

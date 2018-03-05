import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  private category: Category;
  @Output() categoryChangeEvent: EventEmitter<Category> = new EventEmitter(true);


  constructor(private http: HttpClient) { }

  get(slug: string): Observable<Category> {
    const fullEndpointUrl = environment.apiUrl + '/api/categories/' + slug + '/';
    return this.http.get<Category>(fullEndpointUrl);
  }

  setCurrent(category: Category) {
    this.category = category;
    this.categoryChangeEvent.emit(category);
  }

  getCurrent(): Category {
    return this.category;
  }
}

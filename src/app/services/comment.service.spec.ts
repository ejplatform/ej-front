import { TestBed, inject } from '@angular/core/testing';
import { Restangular } from 'ngx-restangular';

import { CommentService } from './comment.service';
import * as helpers from "../../spec/helpers";

describe('CommentService', () => {
  let mocks = helpers.getMocks();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentService,          
        { provide: Restangular, useValue: mocks.restangular},
      ]
    });
  });

  it('should be created', inject([CommentService], (service: CommentService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';
import { RestangularModule } from 'ngx-restangular';

import { CommentService } from './comment.service';
import * as helpers from "../../spec/helpers";

describe('CommentService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule],
      providers: [CommentService]
    });
  });

  it('should be created', inject([CommentService], (service: CommentService) => {
    expect(service).toBeTruthy();
  }));
});

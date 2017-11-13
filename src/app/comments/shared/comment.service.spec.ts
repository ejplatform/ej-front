import { TestBed, inject } from '@angular/core/testing';

import { CommentService } from './comment.service';
import * as helpers from "../../../spec/helpers";

describe('CommentService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentService]
    });
  });

  it('should be created', inject([CommentService], (service: CommentService) => {
    expect(service).toBeTruthy();
  }));

});

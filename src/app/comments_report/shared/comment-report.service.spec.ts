import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommentReportService } from './comment-report.service';
import * as helpers from "../../../spec/helpers";

describe('CommentReportService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      
      providers: [CommentReportService]
    });
  });

  it('should be created', inject([CommentReportService], (service: CommentReportService) => {
    expect(service).toBeTruthy();
  }));

});

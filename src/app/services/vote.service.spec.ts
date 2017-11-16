import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { VoteService } from './vote.service';

describe('VoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],      
      providers: [VoteService]
    });
  });

  it('should be created', inject([VoteService], (service: VoteService) => {
    expect(service).toBeTruthy();
  }));
});

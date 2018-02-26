import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { VoteService } from './vote.service';
import { ProfileService } from './profile.service';
import * as helpers from '../../spec/helpers';

describe('VoteService', () => {
  const mocks = helpers.getMocks();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VoteService,
        { provide: ProfileService, useValue: mocks.profileService },
      ]
    });
  });

  it('should be created', inject([VoteService], (service: VoteService) => {
    expect(service).toBeTruthy();
  }));
});

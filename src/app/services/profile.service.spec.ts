import { TestBed, inject } from '@angular/core/testing';
import { RestangularModule } from 'ngx-restangular';

import { ProfileService } from './profile.service';
import * as helpers from '../../spec/helpers';

describe('CommentService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule],
      providers: [ProfileService]
    });
  });

  it('should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});

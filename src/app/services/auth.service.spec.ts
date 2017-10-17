import { TestBed, inject } from '@angular/core/testing';
import { RestangularModule } from 'ngx-restangular';

import { AuthService } from './auth.service';
import * as helpers from '../../spec/helpers';

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule],
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import * as helpers from '../../spec/helpers';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { SessionService } from './session.service';

describe('ProfileService', () => {
    const mocks = helpers.getMocks();
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
                providers: [ProfileService,
                { provide: SessionService, useValue: mocks.sessionService },
            ]
        });
    });

    it('should be created', inject([ProfileService], (service: ProfileService) => {
        expect(service).toBeTruthy();
    }));

});

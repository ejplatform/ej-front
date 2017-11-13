import { TestBed, inject } from '@angular/core/testing';

import * as helpers from '../../spec/helpers';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { SessionService } from './session.service';

describe('SessionService', () => {

    const mocks = helpers.getMocks();
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SessionService]            
        });
    });

    it('should be created', inject([SessionService], (service: SessionService) => {
        expect(service).toBeTruthy();
    }));

});

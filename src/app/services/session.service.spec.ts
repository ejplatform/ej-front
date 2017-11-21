import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-webstorage';

import * as helpers from '../../spec/helpers';
import { ProfileService } from './profile.service';
import { SessionService } from './session.service';

describe('SessionService', () => {

    const mocks = helpers.getMocks();
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SessionService,
                { provide: LocalStorageService, useValue: mocks.localStorageService }
            ]            
        });
    });

    it('should be created', inject([SessionService], (service: SessionService) => {
        expect(service).toBeTruthy();
    }));

});

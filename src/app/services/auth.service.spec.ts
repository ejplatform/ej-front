import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import * as helpers from '../../spec/helpers';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

describe('AuthService', () => {

    const mocks = helpers.getMocks();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [AuthService, 
                { provide: SessionService, useValue: mocks.sessionService },
            ]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
    
});

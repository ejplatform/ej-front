import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-webstorage';

import * as helpers from '../../spec/helpers';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from './notification.service';
import { ProfileService } from './profile.service';

describe('NotificationService', () => {
    const mocks = helpers.getMocks();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
                providers: [NotificationService,
                { provide: ProfileService, useValue: mocks.profileService },
                { provide: LocalStorageService, useValue: mocks.localStorageService }
            ]
        });
    });

    it('should be created', inject([NotificationService], (service: NotificationService) => {
        expect(service).toBeTruthy();
    }));

});

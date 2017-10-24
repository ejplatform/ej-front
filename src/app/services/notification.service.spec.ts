import { TestBed, inject } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import * as helpers from "../../spec/helpers";

describe('NotificationService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../services/toast.service';
import { RegistrationComponent } from './registration.component';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { SocialFacebookService } from '../services/social-facebook.service';
import * as helpers from '../../spec/helpers';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, RouterTestingModule],
      declarations: [ RegistrationComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: ToastService, useValue: mocks.toastService },        
        { provide: AuthService, useValue: mocks.authService },
        { provide: SocialFacebookService, useValue: mocks.socialFacebookService },
        { provide: NgbActiveModal, useValue: mocks.ngbActiveModal },        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
  });

  it('display form', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('form')).length).toBe(1);
  });

});

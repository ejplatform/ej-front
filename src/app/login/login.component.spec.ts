import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../services/toast.service';
import { LoginComponent } from './login.component';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { SocialFacebookService } from '../services/social-facebook.service';
import * as helpers from '../../spec/helpers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NgbModule.forRoot(), FormsModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: AuthService, useValue: mocks.authService },
        { provide: ToastService, useValue: mocks.toastService },
        { provide: SocialFacebookService, useValue: mocks.socialFacebookService },
        { provide: NgbActiveModal, useValue: mocks.ngbActiveModal },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('display form', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('form')).length).toBe(1);
  });

});

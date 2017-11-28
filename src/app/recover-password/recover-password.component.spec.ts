import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RecoverPasswordComponent } from './recover-password.component';
import { ToastService } from '../services/toast.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import * as helpers from '../../spec/helpers';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NgbModule.forRoot(), FormsModule, RouterTestingModule],
      declarations: [ RecoverPasswordComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: AuthService, useValue: mocks.authService },
        { provide: ToastService, useValue: mocks.toastService },
        { provide: NgbActiveModal, useValue: mocks.ngbActiveModal },        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
  });

  it('display form', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('form')).length).toBe(1);
  });

});

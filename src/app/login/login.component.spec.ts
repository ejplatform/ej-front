import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RestangularModule } from 'ngx-restangular';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { ProfileService } from '../services/profile.service';
import * as helpers from '../../spec/helpers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule, TranslateModule.forRoot()],
      declarations: [ LoginComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
      ],
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

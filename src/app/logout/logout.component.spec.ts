import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import * as helpers from '../../spec/helpers';

import { LogoutComponent } from './logout.component';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';


describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  const mocks = helpers.getMocks();
  
  
  beforeEach(async(() => {
    let authService = spyOn(mocks.authService, 'signOut');
    authService.and.callThrough();

    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), RouterTestingModule],
      declarations: [ LogoutComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: AuthService, useValue: mocks.authService },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
      
    });

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  }));

  it('should call logout', () => {
    expect(mocks.authService.signOut).toHaveBeenCalled();
  });


});

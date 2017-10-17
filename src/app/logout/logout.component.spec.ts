import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RestangularModule } from 'ngx-restangular';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { LogoutComponent } from './logout.component';
import { ProfileService } from '../services/profile.service';
import * as helpers from '../../spec/helpers';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule, TranslateModule.forRoot()],
      declarations: [ LogoutComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  });

  it('display form', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('form')).length).toBe(1);
  });

});

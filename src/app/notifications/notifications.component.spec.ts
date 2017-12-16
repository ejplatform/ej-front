import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from 'ngx-webstorage';

import { NotificationsComponent } from './notifications.component';
import * as helpers from "../../spec/helpers";
import { ProfileService } from '../services/profile.service';
import { GlobalState } from '../global.state';


describe('NotificationsComponent', () => {

  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let mocks = helpers.getMocks();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ],
      imports: [RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [{ provide: GlobalState, useValue: mocks.globalState },
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: LocalStorageService, useValue: mocks.localStorageService },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('display notifications', () => {
      expect(fixture.debugElement.queryAll(By.css('#notification-wrapper')).length).toBe(1);
  });

});

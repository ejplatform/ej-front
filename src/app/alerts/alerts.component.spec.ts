import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


import { AlertsComponent } from './alerts.component';
import * as helpers from "../../spec/helpers";
import { ProfileService } from '../services/profile.service';
import { GlobalState } from '../global.state';


describe('AlertsComponent', () => {

  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let mocks = helpers.getMocks();
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsComponent ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [{ provide: GlobalState, useValue: mocks.globalState },
        { provide: ProfileService, useValue: mocks.profileService },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('display notifications', () => {
      expect(fixture.debugElement.queryAll(By.css('#notification-wrapper')).length).toBe(1);
  });

});

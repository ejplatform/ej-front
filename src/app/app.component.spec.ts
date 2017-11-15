import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";

import * as helpers from "../spec/helpers";
import { GlobalState } from './global.state';
import { ProfileService } from './services/profile.service';
import { SessionService } from './services/session.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mocks = helpers.getMocks();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
        declarations: [ AppComponent ],
        providers: [{ provide: GlobalState, useValue: mocks.globalState },
            { provide: SessionService, useValue: mocks.sessionService },
            { provide: ProfileService, useValue: mocks.profileService },
        ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

//   it(`should have as title 'app'`, async(() => {
//     expect(component.title).toEqual('app');
//   }));

//   it('should render app-header component', async(() => {
//     fixture.detectChanges();
//     expect(fixture.debugElement.queryAll(By.css("app-header")).length).toEqual(1);
//   }));

});

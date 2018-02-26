import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';
import { LocalStorageService } from 'ngx-webstorage';

import * as helpers from '../spec/helpers';
import { GlobalState } from './global.state';
import { ProfileService } from './services/profile.service';
import { SessionService } from './services/session.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, RouterTestingModule,
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])],
      declarations: [AppComponent],
      providers: [{ provide: GlobalState, useValue: mocks.globalState },
      { provide: SessionService, useValue: mocks.sessionService },
      { provide: ProfileService, useValue: mocks.profileService },
      { provide: Angulartics2GoogleAnalytics, useValue: mocks.analyticsService },
      { provide: LocalStorageService, useValue: mocks.localStorageService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

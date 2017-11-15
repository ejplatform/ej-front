import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';


import { HeaderComponent } from './header.component';
import * as helpers from "../../spec/helpers";
import { ProfileService } from '../services/profile.service';
import { GlobalState } from '../global.state';


describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mocks = helpers.getMocks();
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule, TranslateModule.forRoot(), NgPipesModule],
      providers: [{ provide: GlobalState, useValue: mocks.globalState },
        { provide: AuthService, useValue: mocks.authService },        
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: BsModalService, useValue: mocks.bsModalService },        
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('display site-header', () => {
      expect(fixture.debugElement.queryAll(By.css('.site-header')).length).toBe(1);
  });

});

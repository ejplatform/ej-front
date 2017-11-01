import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


import { FooterComponent } from './footer.component';
import * as helpers from "../../spec/helpers";
// import { ProfileService } from '../services/profile.service';
// import { GlobalState } from '../global.state';


describe('FooterComponent', () => {

  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let mocks = helpers.getMocks();
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      // providers: [{ provide: GlobalState, useValue: mocks.globalState },
      //   { provide: ProfileService, useValue: mocks.profileService },
      // ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('display footer', () => {
      expect(fixture.debugElement.queryAll(By.css('footer')).length).toBe(1);
  });

});

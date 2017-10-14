import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RestangularModule } from 'ngx-restangular';
import { By } from '@angular/platform-browser';


import { HeaderComponent } from './header.component';
import * as helpers from "../../spec/helpers";


describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mocks = helpers.getMocks();
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule, RestangularModule, TranslateModule.forRoot()],
      
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

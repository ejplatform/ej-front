import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


import { NudgeComponent } from './nudge.component';
import * as helpers from "../../spec/helpers";

describe('NudgeComponent', () => {

  let component: NudgeComponent;
  let fixture: ComponentFixture<NudgeComponent>;
  let mocks = helpers.getMocks();
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NudgeComponent ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

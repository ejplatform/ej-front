import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import * as helpers from '../../../spec/helpers';
import { SliderModalComponent } from './slider-modal.component';


describe('SliderModalComponent', () => {

  let component: SliderModalComponent;
  let fixture: ComponentFixture<SliderModalComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot()],
      declarations: [ SliderModalComponent ],
      providers: [
        { provide: BsModalRef, useValue: mocks.bsModalRef },        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});

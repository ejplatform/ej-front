import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as helpers from '../../spec/helpers';
import { HomeSliderComponent } from './home-slider.component';
import { ProfileService } from '../services/profile.service';


describe('HomeSliderComponent', () => {

  let component: HomeSliderComponent;
  let fixture: ComponentFixture<HomeSliderComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), FormsModule, NgbModule.forRoot(), ReactiveFormsModule],
      declarations: [ HomeSliderComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },        
        // { provide: BsModalService, useValue: mocks.bsModalService },        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSliderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});

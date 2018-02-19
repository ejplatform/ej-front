import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SafePipe } from '../shared/pipes/safe.pipe';
import { ProfileService } from '../services/profile.service';

import * as helpers from '../../spec/helpers';
import { ParticipateComponent } from './participate.component';
import { GlobalState } from '../global.state';


describe('ParticipateComponent', () => {

  let component: ParticipateComponent;
  let fixture: ComponentFixture<ParticipateComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), NgbModule.forRoot(),FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ ParticipateComponent, SafePipe ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: GlobalState, useValue: mocks.globalState }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});

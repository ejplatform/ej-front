import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileService } from '../services/profile.service';

import * as helpers from '../../spec/helpers';
import { PageComponent } from './page.component';


describe('PageComponent', () => {

  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ PageComponent, SafePipe ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as helpers from '../../spec/helpers';
import { EmbedComponent } from './embed.component';
// import { ImageUploadComponent } from '../shared/image-upload/image-upload.component';
// import { ProfileService } from '../services/profile.service';
// import { AuthService } from '../services/auth.service';


describe('EmbedComponent', () => {

  let component: EmbedComponent;
  let fixture: ComponentFixture<EmbedComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), FormsModule, ReactiveFormsModule],
      declarations: [ EmbedComponent ],
      providers: [
        // { provide: ProfileService, useValue: mocks.profileService },
        // { provide: AuthService, useValue: mocks.authService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});

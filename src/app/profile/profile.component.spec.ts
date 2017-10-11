import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Restangular } from 'ngx-restangular';

import { ProfileComponent } from './profile.component';
import { ImageUploadComponent } from '../shared/image-upload/image-upload.component';
import { ProfileService } from '../services/profile.service';
import * as helpers from '../../spec/helpers';

describe('ProfileComponent', () => {

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot()],
      declarations: [ ProfileComponent, ImageUploadComponent ],
      providers: [
        { provide: Restangular, useValue: mocks.restangular},
        { provide: ProfileService, useValue: mocks.profileService },
      ],

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('p')).length).toBe(1);
  });
});

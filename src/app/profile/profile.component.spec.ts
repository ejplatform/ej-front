import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RestangularModule } from 'ngx-restangular';

import { ProfileComponent } from './profile.component';
import { ImageUploadComponent } from '../shared/image-upload/image-upload.component';
import { ProfileService } from '../services/profile.service';
import * as helpers from "../../spec/helpers";


describe('ProfileComponent', () => {
  
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mocks = helpers.getMocks();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule],      
      declarations: [ ProfileComponent, ImageUploadComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

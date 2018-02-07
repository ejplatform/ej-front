import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VoteComponent } from './vote.component';
import { ProfileService } from '../../../services/profile.service';
import { SessionService } from '../../../services/session.service';
import { TourService } from '../../shared/tour.service';
import * as helpers from '../../../../spec/helpers';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;
  const mocks = helpers.getMocks();
  let commentReportService = null;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), HttpClientTestingModule, FormsModule],
      declarations: [ VoteComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: SessionService, useValue: mocks.sessionService },
        { provide: TourService, useValue: mocks.tourService },        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});

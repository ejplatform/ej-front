import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';
import { ToastService } from '../services/toast.service';

import { Tour } from './shared/tour-model';
import { StepComponent } from './step/step.component';
import { CommentComponent } from './step/comment/comment.component';
import { VoteComponent } from './step/vote/vote.component';
import { BadgeComponent } from './badge/badge.component';
import { PointComponent } from './point/point.component';
import { TipComponent } from './tip/tip.component';
import { TourComponent } from './tour.component';
import { TourService } from './shared/tour.service';
import { SessionService } from '../services/session.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import * as helpers from '../../spec/helpers';

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;
  const mocks = helpers.getMocks();
  let commentReportService = null;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), NgbModule.forRoot(), HttpClientTestingModule, FormsModule],
      declarations: [ TourComponent, RegistrationComponent, LoginComponent, StepComponent, CommentComponent, 
        VoteComponent, BadgeComponent, PointComponent, TipComponent ],
      providers: [
        { provide: AuthService, useValue: mocks.authService },
        { provide: ToastService, useValue: mocks.toastService },
        { provide: TourService, useValue: mocks.tourService },
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: SessionService, useValue: mocks.sessionService },                
        { provide: NgbActiveModal, useValue: mocks.ngbActiveModal },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    component.profile.tour_step = Tour.STEP_TWO

    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});



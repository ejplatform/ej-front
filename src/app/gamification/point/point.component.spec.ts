import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PointComponent } from './point.component';
import { ProfileService } from '../../services/profile.service';
import { TourService } from '../shared/tour.service';
import * as helpers from '../../../spec/helpers';

describe('PointComponent', () => {
  let component: PointComponent;
  let fixture: ComponentFixture<PointComponent>;
  const mocks = helpers.getMocks();
  let commentReportService = null;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), NgbModule.forRoot(), HttpClientTestingModule, FormsModule],
      declarations: [ PointComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: NgbActiveModal, useValue: mocks.ngbActiveModal },
        { provide: TourService, useValue: mocks.tourService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointComponent);
    component = fixture.componentInstance;

    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});


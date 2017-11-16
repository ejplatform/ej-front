import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BsModalService } from 'ngx-bootstrap/modal';

import { NotificationService } from '../../services/notification.service';
import { CommentReportComponent } from './comment-report.component';
import { CommentReport } from '../shared/comment-report.model';
import { CommentReportService } from '../shared/comment-report.service';
import * as helpers from '../../../spec/helpers';

describe('CommentReportComponent', () => {
  let component: CommentReportComponent;
  let fixture: ComponentFixture<CommentReportComponent>;
  const mocks = helpers.getMocks();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NgPipesModule, HttpClientTestingModule],      
      declarations: [ CommentReportComponent ],
      providers: [
        { provide: CommentReportService, useValue: mocks.commentReportService },
        { provide: NotificationService, useValue: mocks.notificationService },        
        { provide: BsModalService, useValue: mocks.bsModalService },        
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentReportComponent);
    component = fixture.componentInstance;
    component.commentReport = <CommentReport>{content: 'some', author: {}, conversation: {}}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

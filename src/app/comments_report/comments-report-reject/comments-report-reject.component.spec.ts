import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Comment } from '../../comments/shared/comment.model';
import { CommentService } from '../../comments/shared/comment.service';
import { NotificationService } from '../../services/notification.service';

import { CommentsReportRejectComponent } from './comments-report-reject.component';
import * as helpers from '../../../spec/helpers';

describe('CommentsReportRejectComponent', () => {
  let component: CommentsReportRejectComponent;
  let fixture: ComponentFixture<CommentsReportRejectComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, RouterTestingModule],
      declarations: [ CommentsReportRejectComponent ],
      providers: [
        { provide: CommentService, useValue: mocks.commentService },
        { provide: NotificationService, useValue: mocks.notificationService },                
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsReportRejectComponent);
    component = fixture.componentInstance;
    component.comment = <Comment>{id: 1}
  });

  it('display form', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('form')).length).toBe(1);
  });

});

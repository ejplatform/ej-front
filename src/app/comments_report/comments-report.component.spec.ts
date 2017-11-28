import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { CommentsReportComponent } from './comments-report.component';
import { CommentReport } from './shared/comment-report.model';
import { Comment } from '../comments/shared/comment.model';
import { CommentReportService } from './shared/comment-report.service';
import { ProfileService } from '../services/profile.service';
import * as helpers from '../../spec/helpers';

describe('CommentsReportComponent', () => {
  let component: CommentsReportComponent;
  let fixture: ComponentFixture<CommentsReportComponent>;
  const mocks = helpers.getMocks();
  let commentReportService = null;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), NgbModule.forRoot(), HttpClientTestingModule, FormsModule],
      declarations: [ CommentsReportComponent ],
      providers: [
        { provide: CommentReportService, useValue: mocks.commentReportService },
        { provide: ProfileService, useValue: mocks.profileService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsReportComponent);
    component = fixture.componentInstance;
    commentReportService = fixture.debugElement.injector.get(CommentReportService);    
    
  });

  it('display comment topic', () => {
    expect(fixture.debugElement.queryAll(By.css('.page-title')).length).toBe(1);
  });

  it('should conversationService list be called', () => {
    component.ngOnInit();
    expect(component.currentStatus).toEqual(Comment.UNMODERATED);
  });

});

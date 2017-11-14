import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap';

import { CommentsComponent } from './comments.component';
import { Comment } from './shared/comment.model';
import { CommentService } from './shared/comment.service';
import { ProfileService } from '../services/profile.service';
import * as helpers from '../../spec/helpers';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  const mocks = helpers.getMocks();
  let commentService = null;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), TabsModule.forRoot(), HttpClientTestingModule],
      declarations: [ CommentsComponent ],
      providers: [
        { provide: CommentService, useValue: mocks.commentService },
        { provide: ProfileService, useValue: mocks.profileService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    commentService = fixture.debugElement.injector.get(CommentService);    
    
  });

  it('display comment topic', () => {
    expect(fixture.debugElement.queryAll(By.css('.page-title')).length).toBe(1);
  });

  it('should conversationService list be called', () => {
    component.ngOnInit();
    
    expect(component.currentStatus).toEqual(Comment.UNMODERATED);
  });

  // it('should conversationService list be called on loadRejectedComments', () => {
  //   spyOn(commentService, 'loadRejectedComments').and.callThrough();
  //   component.ngOnInit();
  //   expect(commentService.loadRejectedComments).toHaveBeenCalled();
  // });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommentsComponent } from './comments.component';
import { Comment } from './shared/comment.model';
import { CommentService } from './shared/comment.service';
import { ProfileService } from '../services/profile.service';
import * as helpers from '../../spec/helpers';

fdescribe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  const mocks = helpers.getMocks();
  let commentService = null;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), HttpClientTestingModule],
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
    spyOn(commentService, 'reports').and.callThrough();
    component.ngOnInit();
    expect(commentService.reports).toHaveBeenCalled();
  });

});

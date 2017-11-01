import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { CommentsComponent } from './comments.component';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { ProfileService } from '../services/profile.service';
import * as helpers from '../../spec/helpers';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot()],
      declarations: [ CommentsComponent ],
      providers: [
        { provide: CommentService, useValue: mocks.commentService },
        { provide: ProfileService, useValue: mocks.profileService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
  });

  it('display all comments in list', () => {
    component.comments = [{content: 'teste', conversation: 1, title: 'comment 1', body: 'comment body 1' }, {content: 'teste', conversation: 1,title: 'comment 2', body: 'comment body 2' }];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(2);
  });

});

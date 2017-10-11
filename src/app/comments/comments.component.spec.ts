import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RestangularModule } from 'ngx-restangular';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { CommentsComponent } from './comments.component';
import { CommentService } from '../services/comment.service';
import * as helpers from "../../spec/helpers";

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let mocks = helpers.getMocks();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule, TranslateModule.forRoot()],
      declarations: [ CommentsComponent ],
      providers: [
        { provide: CommentService, useValue: mocks.commentService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
  });

  it('display all comments in list', () => {
    component.comments = [{title: 'comment 1', body: 'comment body 1' }, {title: 'comment 2', body: 'comment body 2' }, {title: 'comment 3', body: 'comment body 3' }];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(3);
  });

});

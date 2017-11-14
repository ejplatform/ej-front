import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';

import { CommentComponent } from './comment.component';
import { Comment } from '../shared/comment.model';
import { CommentService } from '../shared/comment.service';
import * as helpers from '../../../spec/helpers';

fdescribe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  const mocks = helpers.getMocks();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NgPipesModule],      
      declarations: [ CommentComponent ],
      providers: [
        { provide: CommentService, useValue: mocks.commentService },
        // { provide: ProfileService, useValue: mocks.profileService },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = <Comment>{content: 'some', author: {}}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

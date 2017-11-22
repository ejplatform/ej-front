import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Comment } from '../../comments/shared/comment.model';

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
        { provide: BsModalService, useValue: mocks.bsModalService },
        { provide: BsModalRef, useValue: mocks.bsModalRef },
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

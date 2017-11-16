import { Component, OnInit, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Comment } from '../../comments/shared/comment.model';

@Component({
  selector: 'app-comments-report-modal',
  templateUrl: './comments-report-modal.component.html',
  styleUrls: ['./comments-report-modal.component.scss'],
})
export class CommentsReportModalComponent {

  comment: Comment;
  bsModalRef: BsModalRef;
  bsRegistrationModalRef: BsModalRef;
  reason = new EventEmitter();

  constructor(
    private modalService: BsModalService,
    private modal: BsModalRef, private router: Router) {
    this.bsModalRef = modal;
  }

  save() {
    this.reason.emit(this.comment);
    this.bsModalRef.hide();
  }

}

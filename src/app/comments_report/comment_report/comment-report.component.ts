import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentReport } from '../shared/comment-report.model';
import { Comment } from '../../comments/shared/comment.model';
import { CommentsReportModalComponent } from '../comments-report-modal/comments-report-modal.component';
import { CommentReportService } from '../shared/comment-report.service';
import { CommentService } from '../../comments/shared/comment.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-comment-report',
  templateUrl: './comment-report.component.html',
  styleUrls: ['./comment-report.component.scss'],
  providers: [CommentService],  
})
export class CommentReportComponent implements OnInit {

  @Input() commentReport: CommentReport;
  @Output() onApprovalChange = new EventEmitter();
  bsModalRef: BsModalRef;
  
  constructor(private commentReportService: CommentReportService, private modalService: BsModalService,
    private commentService: CommentService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  approveComment(){
    let comment =  this.getRelatedComment();
    comment.approval = Comment.APPROVED;
    this.commentService.save(comment).subscribe((comment: Comment) => {
      this.onApprovalChange.next(this.commentReport);
    }, (error) =>{ 
      console.log(error);
    });
  }

  rejectComment() {
    this.bsModalRef = this.modalService.show(CommentsReportModalComponent, { class: 'modal-lg' });
    let comment = this.getRelatedComment();
    comment.approval = Comment.REJECTED;
    this.bsModalRef.content.comment = comment;
    this.bsModalRef.content.reason.subscribe(() => {
      this.commentService.save(comment).subscribe((comment: Comment) => {
        this.notificationService.success({ title: "comment-report.save.success.title", message: "comment-report.save.success.message" });
        this.onApprovalChange.next(this.commentReport);
      }, (error) =>{ 
        console.log(error);
      });
    });
  }

  isRejected(){
    return this.commentReport.approval ===  Comment.REJECTED
  }

  isApproved(){
    return this.commentReport.approval ===  Comment.APPROVED
  }

  private getRelatedComment(){
    let comment =  new Comment();
    comment.id = this.commentReport.id;
    comment.content = this.commentReport.content;
    comment.conversation = this.commentReport.conversation.id;
    return comment;    
  }

}

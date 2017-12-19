import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../../comments/shared/comment.model';
import { CommentService } from '../../comments/shared/comment.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-comments-report-reject',
  templateUrl: './comments-report-reject.component.html',
  styleUrls: ['./comments-report-reject.component.scss'],
})
export class CommentsReportRejectComponent {

  @Input() comment: Comment;
  @Output() isCollapsed = new EventEmitter();
  
  constructor(private commentService: CommentService, private toastService: ToastService, private router: Router) {  }

  cancel() {
    this.isCollapsed.next(false);

  }

  rejectComment() {
    this.comment.approval = Comment.REJECTED;
    this.commentService.save(this.comment).subscribe((comment: Comment) => {
        this.toastService.success({ title: "comment-report.save.success.title", message: "comment-report.save.success.message" });
        this.isCollapsed.next(true);
      }, (error) =>{ 
        console.log(error);
    });
  }
  alreadyRejected(){
    return this.comment.approval === Comment.REJECTED
  }

}

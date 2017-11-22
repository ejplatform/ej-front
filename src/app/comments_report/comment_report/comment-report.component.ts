import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentReport } from '../shared/comment-report.model';
import { Comment } from '../../comments/shared/comment.model';
// import { CommentsReportModalComponent } from '../comments-report-modal/comments-report-modal.component';
import { CommentReportService } from '../shared/comment-report.service';
import { CommentService } from '../../comments/shared/comment.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../services/notification.service';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';

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
  profile: Profile;
  comment: Comment;
  isCollapsed = false;
  
  constructor(private commentReportService: CommentReportService, private modalService: BsModalService,
    private commentService: CommentService, private notificationService: NotificationService, 
    private profileService: ProfileService) { 
      this.profile = <Profile>{};
      this.profile = Object.assign(this.profile, this.profileService.getProfile());
      this.profileService.profileChangeEvent.subscribe(profile => {
        this.profile = profile;
      });
    }

  ngOnInit() {
    this.comment = this.getRelatedComment();
    if(this.comment.approval === Comment.REJECTED){
      this.isCollapsed = true;
    }
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

  toggleCollapsed(){
    this.isCollapsed = !this.isCollapsed;
  }

  commentRejected() {
    this.toggleCollapsed();
    this.onApprovalChange.next(this.commentReport);
  }

  couldBeRejected(){
    let couldReject = false;
    if(this.commentReport.author.id === this.profile.id ){
      couldReject =  false;
    } else if(this.commentReport.approval !==  Comment.REJECTED){
      couldReject =  true;
    }
    return couldReject;
  }

  couldBeApproved(){
    let couldApprove = false;
    if(this.commentReport.author.id === this.profile.id ){
      couldApprove =  false;
    } else if(this.commentReport.approval !==  Comment.APPROVED){
      couldApprove =  true;
    }
    return couldApprove;
  }

  private getRelatedComment(){
    let comment =  new Comment();
    comment.id = this.commentReport.id;
    comment.content = this.commentReport.content;
    comment.approval = this.commentReport.approval;
    comment.rejection_reason = this.commentReport.rejection_reason;
    comment.conversation = this.commentReport.conversation.id;
    return comment;    
  }

}

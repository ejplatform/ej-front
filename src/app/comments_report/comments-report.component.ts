import { Component, OnInit } from '@angular/core';

import { CommentReportService } from './shared/comment-report.service';
import { CommentReport } from './shared/comment-report.model';
import { Comment } from '../comments/shared/comment.model';
import { CommentReportList } from './shared/comment-report-list.model';

@Component({
  selector: 'app-comments-report',
  templateUrl: './comments-report.component.html',
  styleUrls: ['./comments-report.component.scss'],
  providers: [CommentReportService],
})
export class CommentsReportComponent implements OnInit {

  commentsReport: CommentReport[];
  currentStatus: string; 
  
  constructor(private commentReportService: CommentReportService) {  }

  ngOnInit() {
    // FIXME check if the user has admin powers to decide the default behavior
    // At this momment the default behavior is the admin one
    this.currentStatus = Comment.UNMODERATED
  }
  
  loadRejectedComments(){
    const params = { 'approval': Comment.REJECTED };
    this.loadComments(params)
  }

  loadModeratedComments(){
    const params = { 'approval': Comment.UNMODERATED };
    this.loadComments(params)
  }

  loadApprovedComments(){
    const params = { 'approval': Comment.APPROVED };
    this.loadComments(params)
  }

  checkActiveTab(tabStatus: string){
    let isActive = false;

    switch (this.currentStatus) { 
      case Comment.APPROVED:
        if(this.currentStatus == tabStatus)
          isActive = true;
        break; 
      case Comment.UNMODERATED: 
        if(this.currentStatus == tabStatus)
          isActive = true;
        break; 
      case Comment.REJECTED: 
        if(this.currentStatus == tabStatus)
          isActive = true;
        break; 
    }
    return isActive;
  }

  updateCommentsList(commentReport){
    this.commentsReport.splice(this.commentsReport.indexOf(commentReport), 1);
  }

  private loadComments(params = <any>{}){
    this.commentReportService.reports(params).subscribe((commentReportList: CommentReportList) => {
      this.commentsReport = <CommentReport[]>commentReportList.results;
    });
  }

}


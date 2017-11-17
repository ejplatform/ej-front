import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash' 

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
  currentPage: number;
  totalItems: number;
  
  constructor(private commentReportService: CommentReportService) {  }

  ngOnInit() {
    // FIXME check if the user has admin powers to decide the default behavior
    // At this momment the default behavior is the admin one
    this.totalItems = 0;
    this.currentStatus = Comment.UNMODERATED
  }
  
  loadRejectedComments(){
    this.currentStatus = Comment.REJECTED;
    this.loadComments()
  }

  loadModeratedComments(){
    this.currentStatus = Comment.UNMODERATED;
    this.loadComments()
  }

  loadApprovedComments(){
    this.currentStatus = Comment.APPROVED;
    this.loadComments()
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

  loadComments(params?: any){
    if(_.isUndefined(params)){
      params = {};
    }
    this.currentPage = params['page'] || 1;
    params['page'] = this.currentPage;
    params['approval'] = this.currentStatus;
    this.commentReportService.reports(params).subscribe((commentReportList: CommentReportList) => {
      this.commentsReport = <CommentReport[]>commentReportList.results;
      this.totalItems = commentReportList.count;
    });
  }

}


import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash' 

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { CommentReportService } from './shared/comment-report.service';
import { CommentReport } from './shared/comment-report.model';
import { Comment } from '../comments/shared/comment.model';
import { CommentReportList } from './shared/comment-report-list.model';

@Component({
  selector: 'app-comments-report',
  templateUrl: './comments-report.component.html',
  styleUrls: ['./comments-report.component.scss'],
  providers: [CommentReportService, ConversationService],
})
export class CommentsReportComponent implements OnInit {

  commentsReport: CommentReport[];
  currentStatus: string;
  currentPage: number;
  totalItems: number;
  conversations: Conversation[];
  selectedConversation: number;
  loading = false;
  
  constructor(private conversationService: ConversationService, private commentReportService: CommentReportService) {  }

  ngOnInit() {
    // FIXME check if the user has admin powers to decide the default behavior
    // At this momment the default behavior is the admin one
    this.totalItems = 0;
    this.selectedConversation = 0;
    this.currentStatus = Comment.UNMODERATED;
    this.conversationService.list().subscribe((conversations: Conversation[]) => {
      this.conversations = _.sortBy(conversations, ['position']);
    });
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

  filterByConversation(){
    this.loadComments({'page': 1});
  }

  updateCommentsList(commentReport){
    this.commentsReport.splice(this.commentsReport.indexOf(commentReport), 1);
  }

  loadComments(params?: any){
    if(_.isUndefined(params)){
      params = {};
    }

    if(this.selectedConversation != 0 ){
      params['conversation_id'] = this.selectedConversation;
    }
    this.currentPage = params['page'] || 1;
    params['page'] = this.currentPage;
    params['approval'] = this.currentStatus;
    this.loading = true;
    this.commentReportService.reports(params).subscribe((commentReportList: CommentReportList) => {
      this.commentsReport = <CommentReport[]>commentReportList.results;
      this.totalItems = commentReportList.count;
      this.loading = false;
    });
  }

}


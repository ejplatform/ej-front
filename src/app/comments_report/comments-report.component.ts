import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgbTabset, NgbTab, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('tabset') tabset;
  
  constructor(private conversationService: ConversationService, private commentReportService: CommentReportService,
    private _changeDetectionRef : ChangeDetectorRef) {  }
  
  ngAfterViewInit(){
    this.tabset.select(this.currentStatus);
    this._changeDetectionRef.detectChanges();
  }
  
  ngOnInit() {
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

  tabChange($event: NgbTabChangeEvent){
    switch ($event.nextId) { 
      case Comment.APPROVED:
        this.loadApprovedComments()
        break; 
      case Comment.UNMODERATED:
      this.loadModeratedComments()
        break; 
      case Comment.REJECTED: 
      this.loadRejectedComments()
        break; 
    }
  }

  filterByConversation(){
    this.loadComments(1);
  }

  updateCommentsList(commentReport){
    this.commentsReport.splice(this.commentsReport.indexOf(commentReport), 1);
  }

  loadComments(page?: any){
    let params = {};

    if(this.selectedConversation != 0 ){
      params['conversation_id'] = this.selectedConversation;
    }
    this.currentPage = page || 1;
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


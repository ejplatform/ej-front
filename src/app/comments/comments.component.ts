import { Component, OnInit } from '@angular/core';

import { CommentService } from './shared/comment.service';
import { Comment } from './shared/comment.model';
import { CommentReport } from './shared/comment-report.model';
import { CommentList } from './shared/comment-list.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService],
})
export class CommentsComponent implements OnInit {

  comments: CommentReport[];
  currentStatus: string; 
  
  constructor(private commentService: CommentService) {  }

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
    this.comments.splice(this.comments.indexOf(commentReport), 1);
  }

  private loadComments(params = <any>{}){
    this.commentService.reports(params).subscribe((commentList: CommentList) => {
      this.comments = <CommentReport[]>commentList.results;
    });
  }

}


import { Component, OnInit } from '@angular/core';

import { CommentService } from './shared/comment.service';
import { Comment } from './shared/comment.model';
import { CommentList } from './shared/comment-list.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService],
})
export class CommentsComponent implements OnInit {

  comments: Comment[];
  
  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.loadRejectedComments();
  }
  
  loadRejectedComments(){
    const params = { 'approval': 'REJECTED' };
    this.loadComments(params)
  }

  loadModeratedComments(){
    const params = { 'approval': 'UNMODERATED' };
    this.loadComments(params)
  }

  loadApprovedComments(){
    const params = { 'approval': 'APPROVED' };
    this.loadComments(params)
  }

  private loadComments(params = <any>{}){
    this.commentService.reports(params).subscribe((commentList: CommentList) => {
      this.comments = <Comment[]>commentList.results;
    });
  }

}


import { Component, OnInit } from '@angular/core';

import { CommentService } from '../services/comment.service';
import { Comment }     from '../models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService],  
})
export class CommentsComponent implements OnInit {

  comments: Comment[];
  
  constructor(private commentService: CommentService) { 
    this.commentService.list().subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

  ngOnInit() {
  }

}

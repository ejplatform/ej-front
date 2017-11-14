import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../shared/comment.model';
import { CommentService } from '../shared/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Output() onApprovalChange = new EventEmitter();
  
  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  onImageError(){
    console.log('ERRO NA IMAGE');
  }

  approveComment(){
    this.comment.approval = Comment.APPROVED;
    this.commentService.save(this.comment).subscribe((comment: Comment) => {
      // this.comment = comment;
      this.onApprovalChange.next(this.comment);
      
    }, (error) =>{ 
      console.log(error);
      this.comment.approval = null;
    });
  }

  rejectComment(){
    this.comment.approval = Comment.REJECTED;
    this.commentService.save(this.comment).subscribe((comment: Comment) => {
      // this.comment = comment;
      this.onApprovalChange.next(this.comment);
    }, (error) =>{ 
      console.log(error);
      this.comment.approval = null;
    });
  }

  isRejected(){
    return this.comment.approval ===  Comment.REJECTED
  }

  isApproved(){
    return this.comment.approval ===  Comment.APPROVED
  }

  // isRejected(){
  //   return this.comment.approval ===  Comment.UNMODERATED
  // }

}

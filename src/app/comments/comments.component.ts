import { Component, OnInit } from '@angular/core';

import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService],
})
export class CommentsComponent implements OnInit {

  profile: Profile;
  comments: Comment[];

  constructor(private commentService: CommentService, private profileService: ProfileService) {
    this.profile = this.profileService.getProfile();
    
    console.log('CommentsComponent: constructor - ', this.profile);
    // FIXME get the comment of user
    this.commentService.list().subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
    this.profileService.profileChangeEvent.subscribe(profile => {
      console.log('CommentsComponent: constructor - profileChangeEvent', profile);
      this.profile = profile;
    });
  }

  ngOnInit() {
  }

}

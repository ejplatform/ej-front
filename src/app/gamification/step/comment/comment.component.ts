import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ProfileService } from '../../../services/profile.service';
import { ConversationService } from '../../../services/conversation.service';
import { CommentService } from '../../../comments/shared/comment.service';
import { TourService } from '../../shared/tour.service';
import { Profile } from '../../../models/profile';
import { Tour } from '../../shared/tour-model';
import { Conversation } from '../../../models/conversation';
import { Comment } from '../../../comments/shared/comment.model';

@Component({
  selector: 'app-step-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [ConversationService, CommentService],
})
export class CommentComponent implements OnInit {
  profile: Profile;
  conversation: Conversation;
  public newCommentText: string;
  public newCommentSuccess: boolean = null;

  constructor(private profileService: ProfileService, private commentService: CommentService,
    private conversationService: ConversationService, private tourService: TourService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());

    // FIXME Replace by random() when we have a random conversation endpoint
    conversationService.list().subscribe(conversations => {
      this.conversation = conversations[0];
    });
  }

  ngOnInit() {
  }

  clearComment() {
    this.newCommentSuccess = null;
    this.newCommentText = '';
  }

  sendComment() {
    const newcomment = new Comment();
    newcomment.content = this.newCommentText;
    newcomment.conversation = this.conversation.id;
    this.commentService.create(newcomment).subscribe(response => {
      this.newCommentText = '';
      this.newCommentSuccess = true;
      if (this.profile.tour_step === Tour.STEP_EIGHT || this.profile.tour_step === Tour.STEP_ELEVEN) {
        this.saveNextStepOnProfile();
      }
    }, error => {
      this.newCommentSuccess = false;
    });
  }

  saveNextStepOnProfile() {
    this.profile.tour_step = this.tourService.nextStep(this.profile.tour_step);
    this.profileService.save(this.profile).subscribe(profile => {
      this.profileService.setProfile(profile);
    }, error => {
      console.log(error);
    });
  }
}

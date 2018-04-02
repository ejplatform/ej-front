import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ProfileService } from '../../../services/profile.service';
import { ConversationService } from '../../../services/conversation.service';
import { VoteService } from '../../../services/vote.service';
import { TourService } from '../../shared/tour.service';
import { Profile } from '../../../models/profile';
import { Tour } from '../../shared/tour-model';
import { Conversation } from '../../../models/conversation';
import { Comment } from '../../../comments/shared/comment.model';
import { SessionService } from '../../../services/session.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-step-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  providers: [ConversationService, VoteService],
})
export class VoteComponent implements OnInit {
  profile: Profile;
  conversation: Conversation;
  comment: Comment;
  amountVotes = 0;

  constructor(private profileService: ProfileService, private conversationService: ConversationService,
    private voteService: VoteService, private tourService: TourService, private sessionService: SessionService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());

    this.conversation = sessionService.getTourConversation();

    if (_.isNil(this.conversation)) {
      this.setRandomConversation();
    } else {
      this.getCommentToVote();
    }

  }

  setRandomConversation() {
    this.conversationService.random().subscribe(conversation => {
      this.conversation = conversation;
      this.sessionService.setTourConversation(this.conversation);
      this.getCommentToVote();
    });
  }

  getCommentToVote() {
    this.conversationService.getNextUnvotedComment(this.conversation.id).subscribe(comment => {
      this.comment = comment;
      this.comment.conversationObj = this.conversation;
    }, error => {
      this.comment = null;
    });
  }

  ngOnInit() {
  }

  saveNextStepOnProfile() {
    this.profile.tour_step = this.tourService.nextStep(this.profile.tour_step);
    this.profileService.save(this.profile).subscribe(profile => {
      this.profileService.setProfile(profile);
      this.amountVotes = 0;
    }, error => {
      console.log(error);
    });
  }

  vote(comment, action) {
    this.voteService[action](comment).subscribe(vote => {
      this.amountVotes += 1;
      if (this.profile.tour_step === Tour.STEP_FIVE && (this.amountVotes === 2)) {
        this.saveNextStepOnProfile();
        this.setRandomConversation();
      } else if (this.profile.tour_step !== Tour.STEP_FIVE) {
        this.saveNextStepOnProfile();
      } else {
        this.conversationService.getNextUnvotedComment(this.conversation.id).subscribe(remoteComment => {
          this.comment = remoteComment;
          this.comment.conversationObj = this.conversation;
        }, error => {
          this.comment = null;
        });
      }
    });

  }

}

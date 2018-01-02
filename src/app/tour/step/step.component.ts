import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash'

import { ProfileService } from '../../services/profile.service';
import { ConversationService } from '../../services/conversation.service';
import { VoteService } from '../../services/vote.service';
import { TourService } from '../shared/tour.service';
import { Profile } from '../../models/profile';
import { Tour } from '../../tour/shared/tour-model';
import { Conversation } from '../../models/conversation';
import { Comment } from '../../comments/shared/comment.model';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  providers: [ ConversationService, VoteService],  
})
export class StepComponent implements OnInit {
  profile: Profile;
  conversation: Conversation;
  comment: Comment;
  amountVotes: number;
  
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService, 
    private conversationService: ConversationService, private voteService: VoteService, private tourService: TourService) { 
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
  }

  ngOnInit() {
    console.log('StepComponent: ngOnInit', this.conversation);
    if(!this.conversation){
      this.conversationService.random().subscribe((conversation: Conversation) => {
        //FIXME Uncoment this line after make random endpoint
        // this.conversation = conversation;
        this.conversation = _.head(conversation);
        this.conversationService.getNextUnvotedComment(this.conversation.id).subscribe(comment => {
          this.comment = comment;
        }, error => {
          this.comment = null;
        });
      });
    }
    if(this.profile.tour_step == Tour.STEP_FIVE){
      this.amountVotes = 0;
    }
    
  }

  saveNextStepOnProfile(){
    this.profile.tour_step = this.tourService.nextStep(this.profile.tour_step)
    this.profileService.save(this.profile).subscribe( profile => {
      console.log('salvando perfil')
      this.profileService.setProfile(profile);
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  vote(comment, action) {
    console.log('StepComponent: vote', action)
    this.voteService[action](comment).subscribe(vote => {
      this.amountVotes += 1;
      console.log('salvando proximo passo')
      if(this.profile.tour_step == Tour.STEP_FIVE && (this.amountVotes == 2)){
        this.saveNextStepOnProfile();
      }else if(this.profile.tour_step != Tour.STEP_FIVE){
        this.saveNextStepOnProfile();
      }else{
        this.conversationService.getNextUnvotedComment(this.conversation.id).subscribe(comment => {
          this.comment = comment;
        }, error => {
          this.comment = null;
        });
      }
    });

    // FIXME encapsulate this call to polis for every vote computed
    // Send this vote to the polis backend also
  //   let votePolisValue;
  //   switch (action) {
  //     case 'agree': {
  //       votePolisValue = -1;
  //       break;
  //     }
  //     case 'disagree': {
  //       votePolisValue = 1;
  //       break;
  //     }
  //     default: {
  //       votePolisValue = 0;
  //       break;
  //     }
  //  }
  //  this.voteService.polisSave(votePolisValue, comment.polis_id, this.conversation.polis_slug, this.profile.id).subscribe();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash' 

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  providers: [ConversationService],
})
export class ConversationComponent implements OnInit {

  @Input() conversation: Conversation;
  @Input() profile: Profile;
  
  constructor(private conversationService: ConversationService, private route: ActivatedRoute, private profileService: ProfileService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe( params => {
      conversationService.get(params.id).subscribe(conversation => {
        this.conversation = conversation;
      });
    });
  }

  ngOnInit() {
    // if(_.isUndefined(this.profile.picture_path)){
    //   this.profile.picture_path = '/assets/images/icons/profile_icon.svg';
    // }
  }

  ratio(conversation: Conversation){
    // if(!conversation)
    //   return 0;
    let ratio = conversation.user_participation_ratio;
    if(!ratio){
      ratio = 0;
    }
    ratio = 50;
    return ratio;
  }

  parserDate(strDate: string){
    strDate = this.convertDate(strDate);
    const newDate = new Date(strDate);
    return newDate;
  }

  convertDate(date){
    let dateArray = date.split("-");
    let newDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
  
    return newDate;
  }

}

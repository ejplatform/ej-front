import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash' 

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  providers: [ConversationService],
})
export class ConversationsComponent implements OnInit {

  conversations: Conversation[];
  @Input() profile: Profile;
  
  constructor(private conversationService: ConversationService, private profileService: ProfileService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
    this.conversationService.list().subscribe((conversations: Conversation[]) => {
      this.conversations = conversations;
      console.log(this.conversations);
    });
    if(_.isUndefined(this.profile.picture_path)){
      this.profile.picture_path = '/assets/images/icons/profile_icon.svg';
    }
  }

  groupConversations(){
    return _.chunk(this.conversations, 3)
  }

  amount(){
    _.size(this.conversations);
  }

  ratio(conversation: Conversation){
    let ratio = conversation.user_participation_ratio;
    if(!ratio){
      ratio = 0;
    }
    // ratio = 50;
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

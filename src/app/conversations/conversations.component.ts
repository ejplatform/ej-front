import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash' 

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
// import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  providers: [ConversationService],
})
export class ConversationsComponent implements OnInit {

  // profile: Profile;
  conversations: Conversation[];
  
  constructor(private conversationService: ConversationService) {
  }

  ngOnInit() {
    this.conversationService.list().subscribe((conversations: Conversation[]) => {
      this.conversations = conversations;
    });
  }

  groupConversations(){
    return _.chunk(this.conversations, 3)
  }

  amount(){
    _.size(this.conversations);
  }

  amountComments(conversation: Conversation): number {
    return _.size(conversation.comments);
  }

  amountVotes(conversation: Conversation): number {
    return 10000;
  }

}

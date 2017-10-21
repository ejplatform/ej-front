import { Component, OnInit } from '@angular/core';

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
      // FIXME get the comment of user
      this.conversationService.list().subscribe((conversations: Conversation[]) => {
        this.conversations = conversations;
      });
  }

}

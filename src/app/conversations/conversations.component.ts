import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

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

  category: any = null;
  conversations: Conversation[];
  categorizedConversations: any = {};
  categories: any = {};
  categoryNames: string[];
  conversationsLoaded = false;
  @Input() profile: Profile;

  constructor(private conversationService: ConversationService,
    private profileService: ProfileService) {

    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
    this.conversationService.list().subscribe((conversations: Conversation[]) => {
      const uncategorizedConversations = [];
      const categorizedConversations = [];
      const categories = {};
      const categoryNames = [''];

      if(!this.hasConversation(conversations)){
        conversations = [];
      }
      conversations.forEach((conversation) => {
        if (conversation.category_name) {
          if (categoryNames.indexOf(conversation.category_name) === -1) {
            categoryNames.push(conversation.category_name);
            categories[conversation.category_name] = { styles: conversation.category_customizations.styles, slug: conversation.category_slug };
          }
          if (!categorizedConversations[conversation.category_name]) {
            categorizedConversations[conversation.category_name] = [];
          }
          categorizedConversations[conversation.category_name].push(conversation);
        } else {
          uncategorizedConversations.push(conversation);
        }
      });
      this.conversations = _.sortBy(uncategorizedConversations, ['position']);
      this.categorizedConversations = categorizedConversations;
      this.categories = categories;
      this.categoryNames = categoryNames;
      this.conversationsLoaded = true;
    }, error => {
      console.log(error);
    });
  }

  hasConversation(conversations = this.conversations){
    let hasConversation = _.isNil(conversations)
    hasConversation = hasConversation ? false : !_.isEmpty(conversations);
    return hasConversation;
  }

  hasCategoryContent(): boolean {
    return false;
  }

  groupConversations(category) {
    if (!category || category === '') {
      return [this.conversations];
    } else {
      return [this.categorizedConversations[category]];
    }
  }
  backgroundImage(conversation: Conversation): string {
    const imagem_path = (_.isNil(conversation.background_image)) ? '/assets/theme/card-bg.jpg' : conversation.background_image;
    return imagem_path;
  }

}


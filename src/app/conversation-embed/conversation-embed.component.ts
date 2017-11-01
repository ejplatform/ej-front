import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash'

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-conversation-embed',
  templateUrl: './conversation-embed.component.html',
  styleUrls: ['./conversation-embed.component.scss'],
  providers: [ConversationService],
})
export class ConversationEmbedComponent implements OnInit {

  @Input() profile: Profile;
  public polis_url = '';
  el: HTMLFrameElement;

  constructor(private conversationService: ConversationService, private route: ActivatedRoute, private profileService: ProfileService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe( params => {
      conversationService.get(params.id).subscribe(conversation => {
        this.polis_url = conversation.polis_url;
      });
    });
  }

  ngOnInit() {}

  checkHeight(ev: Event) {
    this.el = <HTMLFrameElement>ev.target;
    this.el.height = 2850;
  }

}

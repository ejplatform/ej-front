import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as _ from 'lodash'

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { NudgeComponent } from '../nudge/nudge.component';


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
  bsModalRef: BsModalRef;
  conversation: Conversation;
  

  constructor(private conversationService: ConversationService, private route: ActivatedRoute, 
    private profileService: ProfileService, private modalService: BsModalService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe( params => {
      conversationService.get(params.id).subscribe(conversation => {
        this.conversation = conversation;
        this.polis_url = conversation.polis_url;
      });
    });
  }

  ngOnInit() {}

  openNudge() {
    console.log('ConversationEmbedComponent: openNudge',  this.conversation);
    this.bsModalRef = this.modalService.show(NudgeComponent, { class: 'modal-lg' });
    this.bsModalRef.content.conversation = this.conversation;
    // this.bsModalRef.content.loggedIn.subscribe(() => {
    //   this.conversation = this.profileService.getProfile();
    //   this.profileService.profileChangeEvent.emit(this.profile);
    // });
  }
  

  checkHeight(ev: Event) {
    this.el = <HTMLFrameElement>ev.target;
    this.el.height = 2850;
  }

}

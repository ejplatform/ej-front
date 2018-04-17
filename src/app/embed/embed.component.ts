import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { Comment } from '../comments/shared/comment.model';
import { Vote } from '../models/vote';
import { ProfileService } from '../services/profile.service';
import { CommentService } from '../comments/shared/comment.service';
import { VoteService } from '../services/vote.service';


@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  providers: [ConversationService, CommentService, VoteService],
})
export class EmbedComponent implements OnInit {

  @Input() profile: Profile;
  @Input() conversation: Conversation;
  iframeHeight = 1500;
  isHome = false;
  pageTitle: String;

  constructor(private conversationService: ConversationService,
              private route: ActivatedRoute,
              private profileService: ProfileService,
              private commentService: CommentService,
              private voteService: VoteService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe( params => {
      if (params.id) {
        conversationService.get(params.id).subscribe(conversation => {
          this.conversation = conversation;
        }, error => {
          // handle request errors here
        });
        this.pageTitle = 'Conversas';
      }
    });
  }

  ngOnInit() {
    // this.profile = this.profileService.getProfile();
    if (this.conversation === undefined) {
      let path = this.route.snapshot.url.map(p => p.path).join('/');
      if (path === 'inicio' || path === '') {
        path = '';
        this.isHome = true;
        this.pageTitle = 'Por um Novo Programa para o Brasil';
      } else if (path === 'sobre-nos') {
        this.pageTitle = 'Sobre nós';
      } else if (path === 'perguntas-frequentes') {
        this.pageTitle = 'Perguntas frequentes';
      } else if (path === 'conversas') {
        this.pageTitle = 'Conversas';
      } else if (path === 'termos-de-uso') {
        this.pageTitle = 'Termos de uso';
      }
    }
  }

  // openNudge() {
  //   console.log('ConversationEmbedComponent: openNudge',  this.conversation);
  //   this.bsModalRef = this.modalService.show(NudgeComponent, { class: 'modal-lg' });
  //   this.bsModalRef.content.conversation = this.conversation;
  //   // this.bsModalRef.content.loggedIn.subscribe(() => {
  //   //   this.conversation = this.profileService.getProfile();
  //   //   this.profileService.profileChangeEvent.emit(this.profile);
  //   // });
  // }
}
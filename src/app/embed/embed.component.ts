import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash'
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
  styleUrls: ['./embed.component.scss'],
  providers: [ConversationService, CommentService, VoteService],
})
export class EmbedComponent implements OnInit {

  @Input() profile: Profile;
  @Input() conversation: Conversation;
  public polisUrl = environment.polisUrl;
  iframeHeight: number = 1500;
  isHome: boolean = false;
  conversationLoaded: boolean = false;
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
          this.polisUrl = conversation.polis_url;
          this.conversation = conversation;
          this.conversationLoaded = true;
        });
        this.pageTitle = 'Conversas';
      }
    });
  }

  ngOnInit() {
    // this.profile = this.profileService.getProfile();
    if (this.conversation === undefined) {
      let path = this.route.snapshot.url.map(p => p.path).join("/");
      if(path == 'inicio' || path == ''){
        path = '';
        this.isHome = true;
        this.pageTitle = 'Por um Novo Programa para o Brasil';
      } else if (path == 'sobre-nos') {
        this.pageTitle = 'Sobre nós';
      } else if (path == 'perguntas-frequentes') {
        this.pageTitle = 'Perguntas frequentes';
      } else if (path == 'conversas') {
        this.pageTitle = 'Conversas';
      } else if (path == 'termos-de-uso') {
        this.pageTitle = 'Termos de uso';
      }
      this.polisUrl = this.polisUrl + path;
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

  @HostListener('window:message', ['$event'])
  getPolisMessages(event) {

    // Test if it is a comment. If it has the event.data.txt atribute, it is a comment
    if (event.data && event.data.tid !== undefined && event.data.conversation_id !== undefined && event.data.txt !== undefined) {
      let comment = new Comment();
      comment.content = event.data.txt;
      comment.polis_id = event.data.tid;
      comment.conversation = this.conversation.id;
      this.commentService.create(comment).subscribe();
    // Test if it is a vote
  } else if (event.data && event.data.tid !== undefined && event.data.vote !== undefined) {
      this.commentService.getByPolisId(event.data.tid, this.conversation.id).subscribe(comment => {
        if (comment.length == 1){
          let vote = new Vote;
          vote.comment = comment[0].id;
          vote.value = event.data.vote;
          vote.value = -vote.value;
          this.voteService.save(vote).subscribe();
        }
      });
    } else if (event.data && event.data.name === 'outerIframeSetHeightMsg') {
      this.iframeHeight = event.data.height;
    }
  }
}

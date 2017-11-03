import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash'

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { Comment } from '../models/comment';
import { Vote } from '../models/vote';
import { ProfileService } from '../services/profile.service';
import { CommentService } from '../services/comment.service';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-conversation-embed',
  templateUrl: './conversation-embed.component.html',
  styleUrls: ['./conversation-embed.component.scss'],
  providers: [ConversationService, CommentService, VoteService],
})
export class ConversationEmbedComponent implements OnInit {

  @Input() profile: Profile;
  @Input() conversation: Conversation;
  public polis_url = 'https://brasilqueopovoquer.hacklab.com.br/';
  el: HTMLFrameElement;

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
      conversationService.get(params.id).subscribe(conversation => {
        this.polis_url = conversation.polis_url;
        this.conversation = conversation;
      });
    });
  }

  ngOnInit() {}

  // openNudge() {
  //   console.log('ConversationEmbedComponent: openNudge',  this.conversation);
  //   this.bsModalRef = this.modalService.show(NudgeComponent, { class: 'modal-lg' });
  //   this.bsModalRef.content.conversation = this.conversation;
  //   // this.bsModalRef.content.loggedIn.subscribe(() => {
  //   //   this.conversation = this.profileService.getProfile();
  //   //   this.profileService.profileChangeEvent.emit(this.profile);
  //   // });
  // }


  checkHeight(ev: Event) {
    this.el = <HTMLFrameElement>ev.target;
    this.el.height = 2850;
  }

  @HostListener('window:message', ['$event'])
  getPolisMessage(event) {

    // Test if it is a comment. If it has the event.data.txt atribute, it is a comment
    if (event.data && event.data.tid !== undefined && event.data.conversation_id !== undefined && event.data.txt !== undefined) {
      let comment = new Comment();
      comment.content = event.data.txt;
      comment.polis_id = event.data.tid;
      comment.conversation = this.conversation.id;
      this.commentService.create(comment).subscribe();
    // Test if it is a vote
  } else if (event.data && event.data.tid !== undefined && event.data.vote !== undefined) {
      this.commentService.getByPolisId(event.data.tid).subscribe(comment => {
        if (comment.length == 1){
          let vote = new Vote;
          vote.comment = comment[0].id;
          vote.value = event.data.vote;
          vote.value = -vote.value;
          this.voteService.save(vote).subscribe();
        }
      });
    }
  }
}

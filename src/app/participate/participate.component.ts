import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../environments/environment';
import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { Comment } from '../comments/shared/comment.model';
import { Vote } from '../models/vote';
import { ProfileService } from '../services/profile.service';
import { CommentService } from '../comments/shared/comment.service';
import { VoteService } from '../services/vote.service';
import { NudgeComponent } from '../nudge/nudge.component';
import { Nudge } from '../nudge/shared/nudge-model';


@Component({
  selector: 'app-embed',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss'],
  providers: [ConversationService, CommentService, VoteService],
})
export class ParticipateComponent implements OnInit {

  @Input() profile: Profile;
  @Input() conversation: Conversation;
  public polisUrl = environment.polisUrl;
  isHome: boolean = false;
  conversationLoaded: boolean = false;
  pageTitle: String;
  comment: Comment;
  public newCommentText: string;
  public newCommentSuccess: boolean = null;
  truncatedDialog: String;
  truncatedResponse: String;
  displayedStage: String;
  expandedStage: String;

  constructor(private conversationService: ConversationService,
              private route: ActivatedRoute, private profileService: ProfileService,
              private commentService: CommentService, private modalService: NgbModal,
              private voteService: VoteService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe(params => {
      if (params.slug) {
        conversationService.get(params.slug).subscribe(conversation => {
          conversationService.getNextUnvotedComment(conversation.id).subscribe(comment => {
            this.comment = comment;
            this.comment.conversationObj = this.conversation;
          }, error => {
            this.comment = null;
          });
          this.truncatedDialog = conversation.dialog ? this.truncate(conversation.dialog) : null;
          this.truncatedResponse = conversation.response ? this.truncate(conversation.response) : null;
          this.displayedStage = this.truncatedDialog ? 'dialog' : 'response';
          this.conversation = conversation;
          this.conversationLoaded = true;

          // This call will load any polis embed on the page
          // It will be removed as soon as polis graphs are no longer needed
          setTimeout(() => {
            const loadIframes = window['loadIframes'];
            loadIframes();
          }, 3000);
        });
      }
    });
  }

  displayStage(stage) {
    this.displayedStage = stage;
  }

  expandStage(stage) {
    this.expandedStage = this.displayedStage;
    window.scrollTo(0, 0);
  }

  collapseStage() {
    this.expandedStage = null;
  }

  truncate(str) {
    if (str.length > 100) {
      return str.substring(0, 97) + '...';
    } else {
      return str;
    }
  }

  vote(comment, action) {
    this.voteService[action](comment).subscribe(vote => {
      this.conversationService.getNextUnvotedComment(this.conversation.id).subscribe(anothercomment => {
        this.comment = anothercomment;
        this.comment.conversationObj = this.conversation;
      }, error => {
        this.comment = null;
      });
    });
  }

  clearComment() {
    this.newCommentSuccess = null;
    this.newCommentText = "";
  }

  sendComment() {
    const newcomment = new Comment();
    newcomment.content = this.newCommentText;
    newcomment.conversation = this.conversation.id;

    this.commentService.polisCreate(this.newCommentText, this.conversation.polis_slug, this.profile.id).subscribe(
    (commentPolisData: any) => {
      // 'commentPolisData' should contain two properties:
      // - currentPid: number, participant id for the current conversation in polis
      // - tid: number, comment id in polis
      // Note: tid is only unique in its own conversation
      newcomment.polis_id = commentPolisData.tid;

      this.commentService.create(newcomment).subscribe(response => {
        this.newCommentText = '';
        this.newCommentSuccess = true;
        if (!_.isNil(response.nudge) && (response.nudge.state === Nudge.EAGER)) {
          this.openNudge(response.nudge.state);
        }
      }, response => {
        if (!_.isNil(response.error['nudge'])) {
          this.openNudge(response.error['nudge']['state']);
        }
        this.newCommentSuccess = false;
      });

    });
  }

  openNudge(state){
    let nudge = new Nudge();
    nudge.state = state;
    let modal =  this.modalService.open(NudgeComponent, { backdrop  : 'static', keyboard  : false });
    modal.componentInstance.nudge = nudge;
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
}

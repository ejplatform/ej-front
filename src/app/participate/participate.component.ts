import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
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
import { CategoryService } from '../services/category.service';
import { NudgeComponent } from '../nudge/nudge.component';
import { Nudge } from '../nudge/shared/nudge-model';
import { GlobalState } from '../global.state';
import { Category } from '../models/category';


@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss'],
  providers: [ConversationService, CommentService, VoteService],
})
export class ParticipateComponent implements OnInit, OnDestroy {

  @Input() profile: Profile;
  @Input() conversation: Conversation;
  @Input() promoted: String;
  isHome = false;
  conversationLoaded = false;
  pageTitle: String;
  comment: Comment;
  public newCommentText: string;
  public newCommentSuccess: boolean = null;
  truncatedDialog: String;
  truncatedResponse: String;
  displayedStage: String;
  expandedStage: String;
  categoryId = 0;

  constructor(private conversationService: ConversationService,
    private route: ActivatedRoute, private profileService: ProfileService,
    private commentService: CommentService, private modalService: NgbModal,
    private categoryService: CategoryService, private voteService: VoteService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    }, error => {
      // handle request errors here
    });
    this.route.params.subscribe(params => {
      if (params.slug) {
        conversationService.get(params.slug).subscribe(conversation => {
          if (conversation.category_id) {
            this.categoryId = conversation.category_id;
            categoryService.get(conversation.category_id.toString()).subscribe(categorySerialized => {
              const category =  Object.assign(new Category(), categorySerialized);
              categoryService.setCurrent(category);
            }, error => {
              // handle request errors here
              console.log(error);
            });
          } else {
            this.categoryId = 0;
            categoryService.setCurrent(null);
          }
          this.conversationCallback(conversation);
        });
      }
    });
  }

  ngOnDestroy() {
    this.categoryService.setCurrent(null);
  }

  conversationCallback(conversation) {
    this.conversationService.getNextUnvotedComment(conversation.id).subscribe(comment => {
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

  sendComment() {
    const newcomment = new Comment();
    newcomment.content = this.newCommentText;
    newcomment.conversation = this.conversation.id;

    this.commentService.create(newcomment).subscribe(response => {
      this.newCommentText = '';
      this.newCommentSuccess = true;
      if (!_.isNil(response.nudge) && _.includes(Nudge.ALL_STATES, response.nudge.state)) {
        this.openNudge(response.nudge.state);
      }
    }, response => {
      if (!_.isNil(response.error['nudge'])) {
        this.openNudge(response.error['nudge']['state']);
      }
      this.newCommentSuccess = false;
    });
  }

  openNudge(state) {
    const nudge = new Nudge();
    nudge.state = state;
    const modal = this.modalService.open(NudgeComponent, { backdrop: 'static', keyboard: false });
    modal.componentInstance.nudge = nudge;
  }

  commentCharCounter(str) {
    this.newCommentText = str;

    if (str.length > 140) {
      this.newCommentText = this.newCommentText.substr(0, 140);
    }

  }

  ngOnInit() {
    if (this.promoted) {
      this.conversationService.promoted().subscribe((conversations: Conversation[]) => {
        if (!_.isNil(conversations[0])) {
          this.conversationCallback(conversations[0]);
        }
      }, error => {
        // handle request errors here
      });
    } else if (this.conversation === undefined) {
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
}

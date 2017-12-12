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
  isHome: boolean = false;
  conversationLoaded: boolean = false;
  pageTitle: String;
  comment: Comment;
  public newCommentText: string;
  public newCommentSuccess: boolean = null;

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
          conversationService.getNextUnvotedComment(params.id).subscribe(comment => {
            this.comment = comment;
          });
          this.conversation = conversation;
          this.conversationLoaded = true;
        });
      }
    });
  }

  vote(comment, action) {
    this.voteService[action](comment).subscribe(vote => {
      this.conversationService.getNextUnvotedComment(this.conversation.id).subscribe(anothercomment => {
        this.comment = anothercomment;
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
    let newcomment = new Comment();
    newcomment.content = this.newCommentText;
    newcomment.conversation = this.conversation.id;
    this.commentService.create(newcomment).subscribe(response => {
      this.newCommentText = "";
      this.newCommentSuccess = true;
    }, error => {
      this.newCommentSuccess = false;
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
}

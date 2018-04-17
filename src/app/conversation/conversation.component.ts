import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  providers: [ConversationService],
})
export class ConversationComponent implements OnInit {

  @Input() conversation: Conversation;
  @Input() profile: Profile;
  isHome = false;
  pageTitle: String;

  constructor(private conversationService: ConversationService, private route: ActivatedRoute, private profileService: ProfileService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe(params => {
      conversationService.get(params.slug).subscribe(conversation => {
        this.conversation = conversation;
      });
    });
  }

  ngOnInit() {
    if (this.conversation === undefined) {
      let path = this.route.snapshot.url.map(p => p.path).join("/");
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

  ratio(conversation: Conversation) {
    // if(!conversation)
    //   return 0;
    let ratio = conversation.user_participation_ratio;
    if (!ratio) {
      ratio = 0;
    }
    ratio = 50;
    return ratio;
  }

  parserDate(strDate: string) {
    strDate = this.convertDate(strDate);
    if (_.isUndefined(strDate)) {
      return undefined;
    }

    const newDate = new Date(strDate);
    return newDate;
  }

  convertDate(date) {
    if (_.isUndefined(date)) {
      return undefined;
    }

    const dateArray = date.split('-');
    const newDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];

    return newDate;
  }

}

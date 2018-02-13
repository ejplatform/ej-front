import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash'

import { ConversationService } from '../services/conversation.service';
import { CategoryService } from '../services/category.service';
import { Conversation } from '../models/conversation';
import { Category } from '../models/category';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { GlobalState } from '../global.state';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [ConversationService, CategoryService],
})
export class CategoryComponent implements OnDestroy {

  category: Category;
  conversations: Conversation[];
  conversationsLoaded = false;
  @Input() profile: Profile;

  constructor(private conversationService: ConversationService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private _state: GlobalState,
              private profileService: ProfileService) {

    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe(params => {
      categoryService.get(params.slug).subscribe(category => {
        this.category = category;
        this._state.notifyDataChanged('category.data', category);
        conversationService.categorized(category.id).subscribe((conversations: Conversation[]) => {
          this.conversationsLoaded = true;
          this.conversations = _.sortBy(conversations, ['position']);
        });
      }, error => {
        this.conversations = [];
        this.conversationsLoaded = true;
      });
    });
  }
  
  ngOnDestroy() {
    this._state.notifyDataChanged('category.data', null);
  }

  groupConversations(){
    return [this.conversations];
  }

  amount(){
    _.size(this.conversations);
  }

  backgroundImage(conversation: Conversation): string{
    const imagem_path = (_.isNil(conversation.background_image)) ? '/assets/images/card-bg.jpg' : conversation.background_image;
    return imagem_path;
  }

  ratio(conversation: Conversation){
    let ratio = conversation.user_participation_ratio;
    if(!ratio){
      ratio = 0;
    }
    return ratio;
  }

  toPercentage(value){
    return Math.floor(value * 100);
  }

  parserDate(strDate: string){
    strDate = this.convertDate(strDate);
    const newDate = new Date(strDate);
    return newDate;
  }

  convertDate(date){
    let dateArray = date.split("-");
    let newDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

    return newDate;
  }

  hexToRGBA(hex){
    var c;
    c= hex.substring(1).split('');
    if(c.length== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', 0.66)';
  }
}

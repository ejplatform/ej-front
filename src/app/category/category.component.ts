import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import { ConversationService } from '../services/conversation.service';
import { CategoryService } from '../services/category.service';
import { Conversation } from '../models/conversation';
import { Category } from '../models/category';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: '../conversations/conversations.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [ConversationService],
})
export class CategoryComponent implements OnDestroy {

  category: Category;
  categories: any = {};
  categoryNames: string[] = [''];
  conversations: Conversation[];
  conversationsLoaded = false;
  @Input() profile: Profile;
  styles: any = null;

  constructor(private conversationService: ConversationService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private profileService: ProfileService) {

    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe(params => {
      this.sendTagToOneSignal(params.slug);

      categoryService.get(params.slug).subscribe(categorySerialized => {
        this.category =  Object.assign(new Category(), categorySerialized);
        this.styles = this.category ? this.category.getStyle() : null;
        categoryService.setCurrent(this.category);


        conversationService.categorized(this.category.id).subscribe((conversations: Conversation[]) => {
          this.conversationsLoaded = true;
          this.conversations = _.sortBy(conversations, ['position']);
        }, error => {
          // handle request errors here
        });
      }, error => {
        this.conversations = [];
        this.conversationsLoaded = true;
        this.styles = null;
        categoryService.setCurrent(null);
        this.router.navigate(['conversations']);
      });
    });
  }

  trustContent(html: any): SafeHtml {
    if (_.isNil(html)) {
      html = '';
    } else {
      html = this.sanitizer.bypassSecurityTrustHtml(html);
    }
    return html;
  }

  hasCategoryContent(): boolean {
    let hasContent = false;

    if (this.category && this.category.customizations && this.category.customizations.content) {
      hasContent = true;
    }

    return hasContent;

  }

  sendTagToOneSignal(slug): void {
    const OneSignal = window['OneSignal'] || [];
    
    if (OneSignal) {
      OneSignal.push(() => {
        const key = 'category';
        const value = slug;
        OneSignal.sendTag(key, value, (tagsSent) => {
          console.log('OneSignal: Sent tag with key ' + key + ' and value ' + value);
        });
      });
    }
  }

  ngOnDestroy() {
    this.categoryService.setCurrent(null);
  }

  groupConversations() {
    return [this.conversations];
  }

  amount() {
    _.size(this.conversations);
  }

  backgroundImage(conversation: Conversation): string {
    const imagem_path = (_.isNil(conversation.background_image)) ? '/assets/images/card-bg.jpg' : conversation.background_image;
    return imagem_path;
  }

  ratio(conversation: Conversation) {
    let ratio = conversation.user_participation_ratio;
    if (!ratio) {
      ratio = 0;
    }
    return ratio;
  }

  toPercentage(value) {
    return Math.floor(value * 100);
  }

  parserDate(strDate: string) {
    strDate = this.convertDate(strDate);
    const newDate = new Date(strDate);
    return newDate;
  }

  convertDate(date) {
    const dateArray = date.split('-');
    const newDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];

    return newDate;
  }

}

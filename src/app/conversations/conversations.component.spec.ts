
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { ConversationsComponent } from './conversations.component';
import { ConversationService } from '../services/conversation.service';
import { ProfileService } from '../services/profile.service';
import { Conversation } from '../models/conversation';
import * as helpers from '../../spec/helpers';

describe('ConversationsComponent', () => {
  let component: ConversationsComponent;
  let fixture: ComponentFixture<ConversationsComponent>;
  let conversationService = null;
  let mocks = helpers.getMocks();

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      declarations: [ConversationsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ConversationService, useValue: mocks.conversationService },
        { provide: ProfileService, useValue: mocks.profileService }
      ],
    });

    fixture = TestBed.createComponent(ConversationsComponent);
    component = fixture.componentInstance;
    conversationService = fixture.debugElement.injector.get(ConversationService);
  });

  it('display all conversations in list', () => {
    component.categories = { 'Category': {} };
    component.categoryNames = ['Category'];
    component.conversations = [
      <Conversation>{ category_name: 'Category', category_slug: 'category', category_customizations: { styles: { color: 'red' } }, title: 'comment 1', description: 'comment body 1' },
      <Conversation>{ category_name: 'Category', category_slug: 'category', category_customizations: { styles: { color: 'red' } }, title: 'comment 2', description: 'comment body 2' }
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.card')).length).toBe(2);
  });

  it('should conversationService list be called', () => {
    spyOn(conversationService, 'list').and.callThrough();
    component.ngOnInit();
    expect(conversationService.list).toHaveBeenCalled();
  });


  it('should sort conversations by position', fakeAsync(() => {
    const conversations = [
            <Conversation>{ title: 'conversation 1', position: 2 },
            <Conversation>{ title: 'conversation 2', position: 3 },
            <Conversation>{ title: 'conversation 3', position: 1 }];
    spyOn(conversationService, 'list').and.returnValue(Observable.of(conversations));
    fixture.detectChanges();
    tick();

    expect(component.conversations)
    .toEqual([
        <Conversation>{ title: 'conversation 3', position: 1 },
        <Conversation>{ title: 'conversation 1', position: 2 },
        <Conversation>{ title: 'conversation 2', position: 3 }]);
  }));

});

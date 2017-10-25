import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { ConversationsComponent } from './conversations.component';
import { ConversationService } from '../services/conversation.service';
// import { ProfileService } from '../services/profile.service';
import { Conversation } from '../models/conversation';
import * as helpers from '../../spec/helpers';

describe('ConversationsComponent', () => {
  let component: ConversationsComponent;
  let fixture: ComponentFixture<ConversationsComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot()],
      declarations: [ ConversationsComponent ],
      providers: [
        { provide: ConversationService, useValue: mocks.conversationService },
        // { provide: ProfileService, useValue: mocks.profileService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsComponent);
    component = fixture.componentInstance;
  });

  it('display all comments in list', () => {
    component.conversations = [<Conversation>{title: 'comment 1', description: 'comment body 1'}, <Conversation>{title: 'comment 2', description: 'comment body 2' }, <Conversation>{title: 'comment 3', description: 'comment body 3'}];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });

});

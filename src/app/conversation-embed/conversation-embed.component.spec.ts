import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { ConversationEmbedComponent } from './conversation-embed.component';
import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import * as helpers from '../../spec/helpers';

describe('ConversationsEmbedComponent', () => {
  let component: ConversationEmbedComponent;
  let fixture: ComponentFixture<ConversationEmbedComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot()],
      declarations: [ ConversationEmbedComponent ],
      providers: [
        { provide: ConversationService, useValue: mocks.conversationService },
        // { provide: ProfileService, useValue: mocks.profileService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationEmbedComponent);
    component = fixture.componentInstance;
  });

  it('display component', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('iframe')).length).toBe(1);
  });

});

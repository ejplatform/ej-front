import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { ConversationComponent } from './conversation.component';
import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import * as helpers from '../../spec/helpers';

describe('ConversationsComponent', () => {
  let component: ConversationComponent;
  let fixture: ComponentFixture<ConversationComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot()],
      declarations: [ ConversationComponent ],
      providers: [
        { provide: ConversationService, useValue: mocks.conversationService },
        // { provide: ProfileService, useValue: mocks.profileService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationComponent);
    component = fixture.componentInstance;
  });

  it('display all comments in list', () => {
    component.conversation = <Conversation>{title: 'comment 1', description: 'comment body 1'};
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('card')).length).toBe(1);
  });

});

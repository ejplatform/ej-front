import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConversationComponent } from './conversation.component';
import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { ProfileService } from '../services/profile.service';
import * as helpers from '../../spec/helpers';

describe('ConversationComponent', () => {
  let component: ConversationComponent;
  let fixture: ComponentFixture<ConversationComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      declarations: [ ConversationComponent ],
      providers: [
        { provide: ConversationService, useValue: mocks.conversationService },
        { provide: ProfileService, useValue: mocks.profileService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      
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
    expect(fixture.debugElement.queryAll(By.css('.card')).length).toBe(1);
  });

});

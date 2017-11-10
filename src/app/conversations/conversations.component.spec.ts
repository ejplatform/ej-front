
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable'; 

import { ConversationsComponent } from './conversations.component';
import { ConversationService } from '../services/conversation.service';
import { ProfileService } from '../services/profile.service';
import { Conversation } from '../models/conversation';
import * as helpers from '../../spec/helpers';

fdescribe('ConversationsComponent', () => {
  let component: ConversationsComponent;
  let fixture: ComponentFixture<ConversationsComponent>;
  const mocks = helpers.getMocks();
  let conversations = [<Conversation>{title: 'conversation 1', position: 2}, <Conversation>{title: 'conversation 2', position: 3}, <Conversation>{title: 'conversation 3', position: 1}];
  // fixture.detectChanges();
  // mocks.conversationService.list
  // let conversationService = null;
  

  beforeEach(async(() => {
    // conversationService = spyOn(mocks.conversationService, "list");
    // conversationService.and.callThrough();
    
    // TestBed.configureTestingModule({
    //   imports: [FormsModule, HttpModule],
    //   declarations: [LoginComponent],
    // }).overrideComponent(LoginComponent, {
    //   set: {
    //     providers: [
    //       {provide: AuthenticationService, useValue: authServiceMock},
    //       {provide: Router, useValue: routerStub}
    //     ]
    //   }}
    //   ).compileComponents();
    
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      declarations: [ ConversationsComponent ] ,
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [{provide: ConversationService, useValue: mocks.conversationService},
        {provide: ProfileService, useValue: mocks.profileService} ],
        
    });
    // .compileComponents();
    fixture = TestBed.createComponent(ConversationsComponent);
    component = fixture.componentInstance;
    
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ConversationsComponent);
  //   component = fixture.componentInstance;
  //   // fixture.detectChanges();
  // });

  // it('display all comments in list', () => {
  //   component.conversations = [<Conversation>{title: 'comment 1', description: 'comment body 1'}, <Conversation>{title: 'comment 2', description: 'comment body 2' }, <Conversation>{title: 'comment 3', description: 'comment body 3'}];
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  // });

  fit('should sort conversations by position', async(() => {
    console.log('iniciando testessssssssssssssssssssssssssssssssssssssssssssssss', mocks.conversationService.list());
    // const fixture = TestBed.createComponent(ConversationsComponent);
    fixture.detectChanges();
    
    let conversations = [<Conversation>{title: 'conversation 1', position: 2}, <Conversation>{title: 'conversation 2', position: 3}, <Conversation>{title: 'conversation 3', position: 1}];
    // fixture.detectChanges();
    // mocks.conversationService.list
    // spyOn(mocks.conversationService, "list").and.returnValue(conversations);
    let oneReturn = {list: () => {return Observable.of(conversations)}};
    // let service = fixture.debugElement.injector.get(ConversationService);
    spyOn(mocks.conversationService, 'list').and.returnValue(oneReturn);
    // fixture.detectChanges();
    // TestBed.overrideProvider(ConversationService, { useValue: expected });
    
    // tick();
    // fixture.componentInstance.ngOnInit();
    // fixture.detectChanges();
    // done();
    
    component.ngOnInit();
    // tick();
    console.log('fffffffffffffffffffffffffffffffffffffffffffff')
    // expect(service.list).toHaveBeenCalled();
    
    expect(component.conversations).toEqual([<Conversation>{title: 'conversation 3', position: 1}, <Conversation>{title: 'conversation 1', position: 2}, <Conversation>{title: 'conversation 2', position: 3}]);
  }));


  
  // it('should call conversation service list', () => {
  //   fixture = TestBed.createComponent(ConversationsComponent);
  //   component = fixture.componentInstance;
  //   expect(mocks.conversationService.list).toHaveBeenCalled();
  // });
});

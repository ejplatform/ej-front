import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Restangular } from 'ngx-restangular';
import { RestangularModule } from 'ngx-restangular';
import { TranslateModule } from '@ngx-translate/core';


import { CommentsComponent } from './comments.component';
import * as helpers from "../../spec/helpers";


describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let mocks = helpers.getMocks();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule, TranslateModule.forRoot()],
      declarations: [ CommentsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

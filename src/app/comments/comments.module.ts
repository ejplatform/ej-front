import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { NgMathPipesModule } from 'ngx-pipes';

import { CommentsRoutingModule, routedComponents } from './comments.routing';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments.component';

@NgModule({
  imports: [
    CommonModule,
    NgMathPipesModule,
    SharedModule,
    CommentsRoutingModule,
    TabsModule.forRoot()
  ],
  declarations: [routedComponents, CommentComponent]
})
export class CommentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { NgMathPipesModule } from 'ngx-pipes';

import { CommentsReportRoutingModule, routedComponents } from './comments-report.routing';
import { CommentReportComponent } from './comment_report/comment-report.component';
import { CommentsReportComponent } from './comments-report.component';

@NgModule({
  imports: [
    CommonModule,
    NgMathPipesModule,
    SharedModule,
    CommentsReportRoutingModule,
    TabsModule.forRoot()
  ],
  declarations: [routedComponents, CommentReportComponent]
})
export class CommentsReportModule { }

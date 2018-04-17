import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgMathPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommentsReportRoutingModule, routedComponents } from './comments-report.routing';
import { CommentsReportRejectComponent } from './comments-report-reject/comments-report-reject.component';
import { CommentReportComponent } from './comment_report/comment-report.component';
import { CommentsReportComponent } from './comments-report.component';

@NgModule({
  imports: [
    CommonModule,
    NgMathPipesModule,
    SharedModule,
    CommentsReportRoutingModule,
    NgbModule,
  ],

  declarations: [routedComponents, CommentsReportRejectComponent, CommentReportComponent]
})
export class CommentsReportModule { }

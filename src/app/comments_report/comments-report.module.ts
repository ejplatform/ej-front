import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { NgMathPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';

import { CommentsReportRoutingModule, routedComponents } from './comments-report.routing';
import { CommentsReportModalComponent } from './comments-report-modal/comments-report-modal.component';
import { CommentReportComponent } from './comment_report/comment-report.component';
import { CommentsReportComponent } from './comments-report.component';

@NgModule({
  imports: [
    CommonModule,
    NgMathPipesModule,
    SharedModule,
    // FormsModule,
    CommentsReportRoutingModule,    
    TabsModule.forRoot()
  ],
  entryComponents: [CommentsReportModalComponent],

  declarations: [routedComponents, CommentsReportModalComponent, CommentReportComponent]
})
export class CommentsReportModule { }

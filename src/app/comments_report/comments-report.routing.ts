import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CommentsReportComponent } from './comments-report.component';

const routes: Routes = [  
  { path: 'comments', component: CommentsReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsReportRoutingModule { }

export const routedComponents = [CommentsReportComponent];  
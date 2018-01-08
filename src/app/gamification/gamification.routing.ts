import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { TourComponent } from './tour.component';

const routes: Routes = [  
  // { path: 'tour', component: TourComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamificationRoutingModule { }

// export const routedComponents = [TourComponent];  
export const routedComponents = [];  
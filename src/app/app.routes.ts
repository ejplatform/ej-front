import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile/profile.component";


export const rootRouterConfig: Routes = [
  { path: '', component: ProfileComponent },
  // { path: '**', component: LandingPageComponent },
];

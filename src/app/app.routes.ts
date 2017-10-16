import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile/profile.component";
import { CommentsComponent } from "./comments/comments.component";
import { LoginComponent } from "./login/login.component";


export const rootRouterConfig: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'login', component: LoginComponent },  
];

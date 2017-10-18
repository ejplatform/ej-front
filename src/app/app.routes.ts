import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile/profile.component";
import { CommentsComponent } from "./comments/comments.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { EmbedComponent } from "./embed/embed.component";



export const rootRouterConfig: Routes = [
  { path: '', component: EmbedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'logout', component: LogoutComponent },  
];

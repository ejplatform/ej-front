import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile/profile.component";
import { CommentsComponent } from "./comments/comments.component";
import { LogoutComponent } from "./logout/logout.component";
import { EmbedComponent } from "./embed/embed.component";

export const rootRouterConfig: Routes = [
  { path: '', component: EmbedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'inicio', component: EmbedComponent },
  { path: 'sobre-nos', component: EmbedComponent },
  { path: 'perguntas-frequentes', component: EmbedComponent },
];

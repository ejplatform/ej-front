import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile/profile.component";
// import { CommentsReportComponent } from "./comments_report/comments-report.component";
import { ConversationsComponent } from "./conversations/conversations.component";
import { ConversationComponent } from "./conversation/conversation.component";
import { LogoutComponent } from "./logout/logout.component";
import { EmbedComponent } from "./embed/embed.component";

export const rootRouterConfig: Routes = [
  { path: '', component: EmbedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'conversations',
    children: [
      { path: '', component: ConversationsComponent },
      { path: ':id', component: ConversationComponent },
      { path: 'participate/:slug', component: EmbedComponent },
    ],
  },
  { path: 'inicio', component: EmbedComponent },
  { path: 'sobre-nos', component: EmbedComponent },
  { path: 'perguntas-frequentes', component: EmbedComponent },
  { path: 'conversas', component: EmbedComponent },
  { path: 'termos-de-uso', component: EmbedComponent },
];

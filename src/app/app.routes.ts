import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationComponent } from './conversation/conversation.component';
import { LogoutComponent } from './logout/logout.component';
import { EmbedComponent } from './embed/embed.component';
import { NotificationComponent } from './notification/notification.component';
import { CategoryComponent } from './category/category.component';

export const rootRouterConfig: Routes = [
  //FIXME remove this link to EmbedComponent
  { path: '', component: EmbedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'conversations',
    children: [
      { path: '', component: ConversationsComponent },
      { path: ':slug', component: ConversationComponent },
    ],
  },
  //FIXME remove this link to EmbedComponent
  { path: 'inicio', component: EmbedComponent },
  //FIXME remove this link to EmbedComponent
  { path: 'sobre-nos', component: EmbedComponent },
  //FIXME remove this link to EmbedComponent
  { path: 'perguntas-frequentes', component: EmbedComponent },
  //FIXME remove this link to EmbedComponent
  { path: 'conversas', component: EmbedComponent },
  //FIXME remove this link to EmbedComponent
  { path: 'termos-de-uso', component: EmbedComponent },
  { path: 'notifications/:id', component: NotificationComponent },
  { path: ':slug', component: CategoryComponent },
];

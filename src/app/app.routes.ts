import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationComponent } from './conversation/conversation.component';
import { LogoutComponent } from './logout/logout.component';
import { EmbedComponent } from './embed/embed.component';
import { PageComponent } from './page/page.component';
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
  { path: 'sobre-nos', component: PageComponent },
  //FIXME remove this link to EmbedComponent
  { path: 'perguntas-frequentes', component: PageComponent },
  //FIXME remove this link to EmbedComponent
  // { path: 'conversas', component: EmbedComponent },
  //FIXME remove this link to EmbedComponent
  { path: 'rocket', component: PageComponent },
  { path: 'termos-de-uso', component: PageComponent },
  { path: 'notifications/:id', component: NotificationComponent },
  { path: ':slug', component: CategoryComponent },
];

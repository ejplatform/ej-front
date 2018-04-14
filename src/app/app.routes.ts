import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationComponent } from './conversation/conversation.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { NotificationComponent } from './notification/notification.component';
import { CategoryComponent } from './category/category.component';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'conversations',
    children: [
      { path: '', component: ConversationsComponent },
      { path: ':slug', component: ConversationComponent },
    ],
  },
  { path: 'inicio', component: HomeComponent },
  { path: 'sobre-nos', component: PageComponent },
  { path: 'perguntas-frequentes', component: PageComponent },
  { path: 'rocket', component: PageComponent },
  { path: 'termos-de-uso', component: PageComponent },
  { path: 'notifications/:id', component: NotificationComponent },
  { path: ':slug', component: CategoryComponent },
];

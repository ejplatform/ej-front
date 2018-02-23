import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile/profile.component";
import { ConversationsComponent } from "./conversations/conversations.component";
import { ConversationComponent } from "./conversation/conversation.component";
import { LogoutComponent } from "./logout/logout.component";
import { EmbedComponent } from "./embed/embed.component";
import { NotificationComponent } from "./notification/notification.component";
import { CategoryComponent } from "./category/category.component";

export const rootRouterConfig: Routes = [
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
  { path: 'inicio', component: EmbedComponent },
  { path: 'sobre-nos', component: EmbedComponent },
  { path: 'perguntas-frequentes', component: EmbedComponent },
  { path: 'conversas', component: EmbedComponent },
  { path: 'termos-de-uso', component: EmbedComponent },
  { path: 'notifications/:id', component: NotificationComponent },
  { path: ':slug', component: CategoryComponent },
];

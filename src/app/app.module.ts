import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RestangularModule } from 'ngx-restangular';


import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { rootRouterConfig } from './app.routes';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CommentsComponent } from './comments/comments.component';


export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
  // RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavigationBarComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig),
    RestangularModule.forRoot(RestangularConfigFactory),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

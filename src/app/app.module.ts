import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { GlobalState } from './global.state';
import { Angular2TokenService } from 'angular2-token';
import { Ng2Webstorage } from 'ngx-webstorage';
import { HttpModule } from '@angular/http';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';

// Bootstrap

// import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap';

// Application imports

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { EmbedComponent } from './embed/embed.component';
import { rootRouterConfig } from './app.routes';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { CommentsComponent } from './comments/comments.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogoutComponent } from './logout/logout.component';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { SessionService } from './services/session.service';
import { SafePipe } from './shared/pipes/safe.pipe';

import { HttpsRequestInterceptor } from './interceptor.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    EmbedComponent,
    NavigationBarComponent,
    HeaderComponent,
    CommentsComponent,
    ConversationsComponent,
    LoginComponent,
    RegistrationComponent,
    LogoutComponent,
    ImageUploadComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InlineEditorModule,
    NgProgressModule,
    Ng2Webstorage.forRoot({ prefix: 'empurrandojuntos', caseSensitive: true }) ,
    // For load all bootstrap modules
    // Ng2BootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(rootRouterConfig),
    HttpModule
  ],
  providers: [GlobalState, 
    Angular2TokenService, 
    AuthService,
    SessionService,
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },    
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    
  ],
  entryComponents: [LoginComponent, RegistrationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

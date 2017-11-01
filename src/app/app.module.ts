import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { GlobalState } from './global.state';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpsRequestInterceptor } from './interceptor.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';

// Bootstrap

// import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap';


// Application imports

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { EmbedComponent } from './embed/embed.component';
import { rootRouterConfig } from './app.routes';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CommentsComponent } from './comments/comments.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationEmbedComponent } from './conversation-embed/conversation-embed.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogoutComponent } from './logout/logout.component';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { SocialFacebookService } from './services/social-facebook.service';
import { NotificationService } from './services/notification.service';
import { SessionService } from './services/session.service';
import { TwitterService } from './services/twitter.service';
import { SafePipe } from './shared/pipes/safe.pipe';
import { ValidationMessageComponent } from './shared/validation-message/validation-message.component';
import { ValidateOnBlurDirective } from './shared/validation-message/validate-onblur.directive';

import { FacebookModule } from 'ngx-facebook';
import { FacebookService } from 'ngx-facebook';


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
    FooterComponent,
    AlertsComponent,
    CommentsComponent,
    ConversationsComponent,
    ConversationComponent,
    ConversationEmbedComponent,
    LoginComponent,
    RegistrationComponent,
    LogoutComponent,
    ImageUploadComponent,
    SafePipe,
    ValidationMessageComponent,
    ValidateOnBlurDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InlineEditorModule,
    NgProgressModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FacebookModule.forRoot(),
    Ng2Webstorage.forRoot({ prefix: 'empurrandojuntos', caseSensitive: true }) ,
    // For load all bootstrap modules
    // Ng2BootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(rootRouterConfig),
  ],
  providers: [GlobalState,
    AuthService,
    SessionService,
    ProfileService,
    SocialFacebookService,
    TwitterService,
    FacebookService,
    NotificationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },

  ],
  entryComponents: [LoginComponent, RegistrationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

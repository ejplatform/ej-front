import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { GlobalState } from './global.state';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpsRequestInterceptor } from './interceptor.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { HttpModule } from '@angular/http';
import { rootRouterConfig } from './app.routes';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ngx-facebook
import { FacebookModule } from 'ngx-facebook';

// ngx-cookie-service
import { CookieService } from 'ngx-cookie-service';

// angulartics2
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

// Application Modules
import { CommentsReportModule } from './comments_report/comments-report.module';
import { SharedModule } from './shared/shared.module';
import { GamificationModule } from './gamification/gamification.module';

// Application imports
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { EmbedComponent } from './embed/embed.component';
import { PageComponent } from './page/page.component';
import { ParticipateComponent } from './participate/participate.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationComponent } from './notification/notification.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationComponent } from './conversation/conversation.component';
import { LoginComponent } from './login/login.component';
import { SliderModalComponent } from './home-slider/slider-modal/slider-modal.component';
import { NudgeComponent } from './nudge/nudge.component';
import { RegistrationComponent } from './registration/registration.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { ValidationMessageComponent } from './shared/validation-message/validation-message.component';
import { ValidateOnBlurDirective } from './shared/validation-message/validate-onblur.directive';



// Hotspots components
import { ThemeFooterComponent } from './hotspots/components/theme-footer/theme-footer.component';
import { ThemeHeaderComponent } from './hotspots/components/theme-header/theme-header.component';
import { ThemeTopHeaderComponent } from './hotspots/components/theme-top-header/theme-top-header.component';
import { ThemeMenuComponent } from './hotspots/components/theme-menu/theme-menu.component';


// Gamification Tour components
import { TourInterceptor } from './gamification/shared/tour.interceptor';
import { BadgeInterceptor } from './gamification/shared/badge.interceptor';
import { BadgeComponent } from './gamification/badge/badge.component';
import { environment } from '../environments/environment';
import { BadgeService } from './gamification/shared/badge.service';

// Services
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { CategoryService } from './services/category.service';
import { SocialFacebookService } from './services/social-facebook.service';
import { ToastService } from './services/toast.service';
import { SessionService } from './services/session.service';

import * as Raven from 'raven-js';
import * as theme from '../theme';

if (environment.sentryDSN) {
  Raven.config(environment.sentryDSN)
       .install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    console.error(err);
    // If an HttpErrorResponse has been thrown, an event has already been sent to Sentry
    // Therefore, the usual error handling must be bypassed on that case
    if (!(err instanceof HttpErrorResponse)) {
      Raven.captureException(err.originalError || err);
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    EmbedComponent,
    PageComponent,
    ParticipateComponent,
    NotificationsComponent,
    NotificationComponent,
    ConversationsComponent,
    ConversationComponent,
    HomeSliderComponent,
    LoginComponent,
    SliderModalComponent,
    NudgeComponent,
    RegistrationComponent,
    RecoverPasswordComponent,
    LogoutComponent,
    ImageUploadComponent,
    SafePipe,
    ValidationMessageComponent,
    ValidateOnBlurDirective,
    CategoryComponent,
    ThemeFooterComponent,
    ThemeHeaderComponent,
    ThemeTopHeaderComponent,
    ThemeMenuComponent,
    HomeComponent,
    HowItWorksComponent,
    theme.hotspots
  ],
  imports: [
    CommentsReportModule,
    GamificationModule,
    SharedModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    InlineEditorModule,
    NgProgressModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FacebookModule.forRoot(),
    Ng2Webstorage.forRoot({ prefix: 'empurrandojuntos', caseSensitive: true }) ,
    NgbModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    HttpModule,
    ShareButtonsModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  providers: [GlobalState,
    AuthService,
    SessionService,
    BadgeService,
    ProfileService,
    CategoryService,
    SocialFacebookService,
    ToastService,
    CookieService,
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TourInterceptor, multi: true },
    // Wait defininition if the badges will be displayed for the user anytime
    // { provide: HTTP_INTERCEPTORS, useClass: BadgeInterceptor, multi: true },

  ],
  entryComponents: [LoginComponent,
                    RegistrationComponent,
                    NudgeComponent,
                    SliderModalComponent,
                    theme.hotspots,
                    RecoverPasswordComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

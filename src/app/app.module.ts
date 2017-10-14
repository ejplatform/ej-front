import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RestangularModule } from 'ngx-restangular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { GlobalState } from './global.state';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { rootRouterConfig } from './app.routes';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { CommentsComponent } from './comments/comments.component';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';


export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
}


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavigationBarComponent,
    HeaderComponent,
    CommentsComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InlineEditorModule,
    // BsDropdownModule.forRoot(),
    Ng2BootstrapModule.forRoot(),
    CollapseModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(rootRouterConfig),
    RestangularModule.forRoot(RestangularConfigFactory),
    // NgbModule.forRoot(),
  ],
  providers: [GlobalState],
  bootstrap: [AppComponent]
})
export class AppModule { }

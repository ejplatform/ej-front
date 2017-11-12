// import { NgModule } from '@angular/core';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TabsModule } from 'ngx-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateService,  } from '@ngx-translate/core';

// import { CommentsRoutingModule, routedComponents } from './comments.routing';
// import { CommentComponent } from './comment/comment.component';
// import { CommentsComponent } from './comments.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // CommentsRoutingModule,
    // TabsModule.forRoot()
  ],
  exports: [TranslateModule],
  // declarations: [],
})
export class SharedModule { 
  // static forRoot(): ModuleWithProviders {
  //   return <ModuleWithProviders>{
  //     ngModule: DataModule,
  //     providers: [
  //       ...SERVICES,
  //     ],
  //   };
  // }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [TranslateService],
    };
  }
}

import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour.component';
import { StepComponent } from './step/step.component';
import { BadgeComponent } from './badge/badge.component';
import { TourRoutingModule, routedComponents } from './tour.routing';
import { TourInterceptor } from './interceptor.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from '../registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    TourRoutingModule,
  ],
  providers: [
    NgbActiveModal
  ],
  declarations: [ routedComponents, TourComponent, StepComponent, BadgeComponent ],
  entryComponents: [ TourComponent ],
})
export class TourModule {
  static withComponents(components: any[]) {
    return {
        ngModule: TourModule,
        providers: [
            {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
        ]
    }
}
 }

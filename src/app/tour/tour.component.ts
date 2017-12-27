import { Component, OnInit, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { RegistrationComponent } from '../registration/registration.component';
import { StepComponent } from './step/step.component';
import { Tour } from '../tour/shared/tour-model';
import { DynamicService } from './shared/dynamic.service';
import { BadgeComponent } from './badge/badge.component';

@Component({
  selector: 'app-tour',
  template: "",
  entryComponents:[ RegistrationComponent, StepComponent, BadgeComponent ]
  
  // styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  profile: Profile;
  bsModalRef: any;  
  
  constructor( private profileService: ProfileService, private modalService: NgbModal, 
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
  ) { 
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
    let componentType: any;
    switch (this.profile.tour_step) {
      case Tour.STEP_ONE: {
        componentType = BadgeComponent;
        break;
      }
      case Tour.STEP_TWO: {
        componentType = BadgeComponent;
        break;
      }
      case Tour.STEP_THREE: {
        componentType = StepComponent;
        break;
      }
      default: {
        componentType = RegistrationComponent;
        break;
      }
   }
   let compFactory = this.cfr.resolveComponentFactory(componentType);
   this.viewContainerRef.createComponent(compFactory);
   
  }

}

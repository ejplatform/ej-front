import { Component, OnInit, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef,
  ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { concat } from 'rxjs/observable/concat';
import * as _ from 'lodash';

import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';
import { StepComponent } from './step/step.component';
import { Tour } from './shared/tour-model';
import { TourService } from './shared/tour.service';
import { BadgeComponent } from './badge/badge.component';
import { PointComponent } from './point/point.component';
import { SessionService } from '../services/session.service';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';

@Component({
  selector: 'app-tour',
  template: '',
  entryComponents: [RegistrationComponent, LoginComponent, StepComponent, BadgeComponent, PointComponent]
})
export class TourComponent implements OnInit {
  profile: Profile;

  constructor(private profileService: ProfileService, private modalService: NgbModal,
    private viewContainerRef: ViewContainerRef, private factory: ComponentFactoryResolver,
    public activeModal: NgbActiveModal, private tourService: TourService, private sessionService: SessionService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
      this.resolveComponent();
    });

    this.sessionService.sessionChangeEvent.subscribe(data => {
      this.resolveComponent();
    });
  }

  ngOnInit() {
    if (!_.isNil(this.profile) && !_.isNil(this.profile.id) && (this.profile.tour_step === '' || _.isNil(this.profile.tour_step))) {
      this.profileService.me().subscribe(profile => {
        profile.tour_step = _.isNil(profile.tour_step) ? Tour.STEP_TWO : profile.tour_step;
        this.profile = profile;
        this.profileService.setProfile(this.profile);
        this.resolveComponent();

      }, error => {
        // handle request errors here
      });

    } else {
      this.resolveComponent();
    }
  }

  resolveComponent() {
    let componentType: any;
    const step = _.isNil(this.profile) ? '' : this.profile.tour_step;
    componentType = this.componentByStep(_.toString(step));
    if (_.isNil(componentType)) {
      this.activeModal.close();
    } else {
      const compFactory = this.factory.resolveComponentFactory(componentType);
      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(compFactory);
    }
  }

  componentByStep(step: string) {
    let componentType: any;
    switch (step) {
      case '': {
        break;
      }
      case Tour.STEP_ONE: {
        componentType = PointComponent;
        break;
      }
      case Tour.STEP_TWO: {
        componentType = PointComponent;
        break;
      }
      case Tour.STEP_THREE: {
        componentType = StepComponent;
        break;
      }
      case Tour.STEP_FOUR: {
        this.sessionService.destroyTourConversation();
        componentType = PointComponent;
        break;
      }
      case Tour.STEP_FIVE: {
        componentType = StepComponent;
        break;
      }
      case Tour.STEP_SIX: {
        this.sessionService.destroyTourConversation();
        componentType = BadgeComponent;
        break;
      }
    }

    return componentType;
  }

}

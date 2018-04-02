import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import * as _ from 'lodash';

import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from '../shared/tour-model';
import { VoteComponent } from './vote/vote.component';

@Component({
  selector: 'app-tour-step',
  template: '',
  entryComponents: [VoteComponent]
})
export class StepComponent implements OnInit {
  profile: Profile;

  constructor(private profileService: ProfileService, private viewContainerRef: ViewContainerRef,
    private factory: ComponentFactoryResolver) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
      this.ngOnInit();
    });
  }

  ngOnInit() {
    let componentType: any;
    const step = _.isNil(this.profile) ? '' : _.toString(this.profile.tour_step);

    switch (step) {
      case Tour.STEP_THREE: {
        componentType = VoteComponent;
        break;
      }
      case Tour.STEP_FIVE: {
        componentType = VoteComponent;
        break;
      }
      case Tour.STEP_EIGHT: {
        componentType = VoteComponent;
        break;
      }
      case Tour.STEP_TEN: {
        componentType = VoteComponent;
        break;
      }
    }
    if (!_.isNil(componentType)) {
      const compFactory = this.factory.resolveComponentFactory(componentType);
      this.viewContainerRef.createComponent(compFactory);
    }

  }

}

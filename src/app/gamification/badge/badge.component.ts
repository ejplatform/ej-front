import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash'

import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from '../shared/tour-model';
import { Badge } from '../shared/badge-model';
import { TourService } from '../shared/tour.service';
import { BadgeService } from '../shared/badge.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  profile: Profile;  
  currentStep = '';
  badge: Badge;
  
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService, 
    private tourService: TourService,  private badgService: BadgeService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
   }

  ngOnInit() {
    this.currentStep = this.profile.tour_step;
    if(_.isNil(this.badge)){
      this.badge = new Badge();
      this.badge.slug = this.profile.tour_step
    }
    this.fillBadge();
    
    //FIXME remove this check after save the information on endpoint
    if(this.badgService.wasSeen(this.badge)){
      this.activeModal.close()
    }      
  }

  fillBadge(){
    this.badge.title = 'gamification.badge.' + this.badge.slug + '.title'
    this.badge.subtitle = 'gamification.badge.' + this.badge.slug + '.subtitle'
    this.badge.imagePath = '/assets/images/badges/' + this.badge.slug + '.svg'
    this.badge.detail = 'gamification.badge.' + this.badge.slug + '.detail'
    this.badge.buttonName = 'gamification.badge.' + this.badge.slug + '.button'
    this.badge.name = 'gamification.badge.' + this.badge.slug + '.name'
    this.badge.currentLevel = 3
  }

  save(){
    if(this.profile.tour_step != Tour.STEP_FINISH ){
      this.saveProfile();
    } else{
      this.seeBadge();
    }
  }

  seeBadge(){
    this.badgService.seen(this.badge).subscribe(badge => {
      console.log('COLOCANDO BAGDE COMO LIDO', this.badge)
      this.activeModal.close()
    })
  }

  saveProfile(){
    this.profile.tour_step = this.tourService.nextStep(this.profile.tour_step)
    this.profileService.save(this.profile).subscribe( profile => {
      this.profileService.setProfile(profile);
    }, error => {
      console.log(error);
    });
  }

}

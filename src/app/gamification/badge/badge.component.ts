import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from '../shared/tour-model';
import { TourService } from '../shared/tour.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  profile: Profile;  
  currentStep = '';
  
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService, private tourService: TourService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
   }

  ngOnInit() {
    this.currentStep = this.profile.tour_step;    
  }

  saveProfile(){
    this.profile.tour_step = this.tourService.nextStep(this.profile.tour_step)
    this.profileService.save(this.profile).subscribe( profile => {
      this.profileService.setProfile(profile);
    }, error => {
      console.log(error);
    });
  }

  getImagePath(){
    let path = ''
    if(this.currentStep == Tour.STEP_SIX){
      path = '/assets/images/badges/medalha_opinador.svg'
    } else if(this.currentStep == Tour.STEP_NINE){
      path = '/assets/images/badges/medalha_sabetudo.svg'
    }
    return path
  }

}

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
  title = ''
  subtitle = ''
  detail = ''
  buttonText = ''
  
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService, private tourService: TourService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
   }

  ngOnInit() {
    
    switch (this.profile.tour_step) {
      case Tour.STEP_SIX: {
        this.stepSixContent()
        break;
      }
      case Tour.STEP_TWELVE: {
        this.stepTwelveContent()
        break;
      }
    }    
    
  }

  saveProfile(){
    this.profile.tour_step = this.tourService.nextStep(this.profile.tour_step)
    this.profileService.save(this.profile).subscribe( profile => {
      this.profileService.setProfile(profile);
      // window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  stepSixContent(){
    this.title = 'Parabéns'
    this.subtitle = 'VOCÊ GANHOU SUA 1 MEDALHA'
    this.detail = 'Continue na ativa e acumule novos pontos'
    this.buttonText = 'CONTINUAR'
  }

  stepTwelveContent(){
    this.title = 'Parabéns'
    this.subtitle = 'VOCÊ GANHOU SUA 2 MEDALHA'
    this.detail = 'Vote mais duas vezes para desbloquear o modo mundo aberto'
    this.buttonText = 'VOTAR'
  }

}

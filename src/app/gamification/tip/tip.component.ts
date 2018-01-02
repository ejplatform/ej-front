import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from '../shared/tour-model';
import { TourService } from '../shared/tour.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {
  profile: Profile;  
  title = ''
  subtitle = ''
  points: Number
  detail = ''
  buttonText = ''
  
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService, private tourService: TourService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
   }

  ngOnInit() {
    
    switch (this.profile.tour_step) {  
      case Tour.STEP_SEVEN: {
        this.stepSevenContent()
        break;
      }
      case Tour.STEP_TEN: {
        this.stepTenContent()
        break;
      }
    }    
    
  }

  saveProfile(){
    this.profile.tour_step = this.tourService.nextStep(this.profile.tour_step)
    
    this.profileService.save(this.profile).subscribe( profile => {
      this.profileService.setProfile(profile);
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  stepSevenContent(){
    this.title = 'Mostre Que Sabe Tudo'
    this.subtitle = 'Opine em uma conversa de outro assunto e ganhe novos poderes.'
    this.buttonText = 'OPINAR EM OUTRA CONVERSA'
  }

  stepTenContent(){
    this.title = 'Opine nessa nova conversa para ganhar'
    this.subtitle = '50 pontos'
    this.buttonText = 'VOTAR'
  }
  
}

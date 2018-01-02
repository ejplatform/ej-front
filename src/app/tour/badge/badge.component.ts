import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from '../../tour/shared/tour-model';
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
  points: Number
  detail = ''
  buttonText = ''
  
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService, private tourService: TourService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
   }

  ngOnInit() {
    
    switch (this.profile.tour_step) {  
      case Tour.STEP_TWO: {
        this.stepTwoContent()
        break;
      }
      case Tour.STEP_FOUR: {
        this.stepFourContent()
        break;
      }
      case Tour.STEP_SIX: {
        this.stepSixContent()
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

  stepTwoContent(){
    this.title = 'Obrigado por se Cadastrar'
    this.subtitle = 'VOCÊ GANHOU'
    this.points = 100
    this.detail = 'Descubra de um jeito simples de participar'
    this.buttonText = 'COMECE O JOGO'
  }
  stepFourContent(){
    this.title = 'Parabéns'
    this.subtitle = 'VOCÊ GANHOU'
    this.points = 10
    this.detail = 'Vote em mais 2 comentários e ganhe sua primeira Medalha!'
    this.buttonText = 'VOTAR'
  }
  stepSixContent(){
    this.title = 'Parabéns'
    this.subtitle = 'VOCÊ GANHOU SUA 1 MEDALHA'
    this.points = 10
    this.detail = 'Continue na ativa e acumule novos pontos'
    this.buttonText = 'CONTINUAR'
  }

}

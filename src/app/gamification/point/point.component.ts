import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from '../shared/tour-model';
import { TourService } from '../shared/tour.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {
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
      case Tour.STEP_NINE: {
        this.stepNineContent()
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

  stepNineContent(){
    this.title = 'Muito bem! mudou de conversa pela primeira vez e'
    this.subtitle = 'VOCÊ GANHOU'
    this.points = 100
    this.detail = 'Continue na ativa e acumule novos pontos'
    this.buttonText = 'CONTINUAR'
  }

}

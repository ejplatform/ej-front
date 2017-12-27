import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from '../../tour/shared/tour-model';

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
  
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
   }

  ngOnInit() {
    
    switch (this.profile.tour_step) {  
      case Tour.STEP_TWO: {
        this.stepTwoFields()
        break;
      }
      case Tour.STEP_THREE: {
        break;
      }
      default: {

        break;
      }
    }    
    
  }

  nextStep(){
    switch (this.profile.tour_step) {  
      case Tour.STEP_TWO: {
        return Tour.STEP_THREE
      }
      case Tour.STEP_THREE: {
        return Tour.STEP_FOUR
      }
    }  
  }
  saveProfile(){
    this.profile.tour_step = this.nextStep()
    this.profileService.save(this.profile).subscribe( profile => {
      // this.toastService.success({ title: "profile.save.success.title", message: "profile.save.success.message" });
      this.profileService.setProfile(profile);
      window.location.reload();
      // this.router.navigate(['profile']);

    }, error => {
      // this.handleError(error);
      console.log(error);
    });
  }

  stepTwoFields(){
    this.title = 'Obrigado por se Cadastrar'
    this.subtitle = 'VOCÊ GANHOU'
    this.points = 100
    this.detail = 'Descubra de um jeito simples de participar'
    this.buttonText = 'COMECE O JOGO'
  }

}

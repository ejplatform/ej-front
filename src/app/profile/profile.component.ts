import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash' 

import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  profile: Profile;

  @ViewChild('password') password;
  @ViewChild('passwordConfirmation') passwordConfirmation;

  genderOptions = [
    {id: 'FEMALE', name: "Mulher"},
    {id: 'MALE', name: "Homem"},
    {id: 'CIS_FEMALE', name: "Mulher Cis"},
    {id: 'CIS_MALE', name: "Homem Cis"},
    {id: 'AGENDER', name: "Agênero"},
    {id: 'GENDERQUEER', name: 'Genderquer'},
    {id: 'GENDERFLUID', name: 'Gênero Fluído'},
    {id: 'NON-CONFORMIST_GENDER', name: 'Gênero Não-conformista'},
    {id: 'VARIANT_GENDER', name: 'Gênero Variante'},
    {id: 'INTERSEX', name: 'Intersex'},
    {id: 'NON-BINARY', name: 'Não-binário'},
    {id: 'TRANSGENDERED', name: 'Transgênero'},
    {id: 'PANGENDER', name: 'Pangênero'},
    {id: 'TRANSSEXUAL_WOMAN', name: 'Mulher Transexual'},
    {id: 'TRANSSEXUAL_MAN', name: 'Homem Transexual'},
    {id: 'TRANSFEMINAL', name: 'Transfeminino'},
    {id: 'TRANSMASCULINE', name: 'Transmasculino'},
    {id: 'DO_NOT_KNOW', name: 'Não sei'},
    {id: 'NONE', name: 'Nenhum'},
    {id: 'OTHER', name: 'Outro'},
  ];

  raceColorOptions = [
    {id: 'BLACK', name: "Preta"},
    {id: 'BROWN', name: "Parda"},
    {id: 'WHITE', name: "Branca"},
    {id: 'YELLOW', name: "Amarela"},
    {id: 'INDIGENOUS', name: "Indígena"},
    {id: 'DO_NOT_KNOW', name: "Não sei"},
    {id: 'UNDECLARED', name: "Não declarada"},
  ];

  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router, 
    private notificationService: NotificationService) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.initializeFields(this.profile);
    console.log('constructor', this.profile);
    
  }

  save() {
    this.profileService.save(this.profile).subscribe( profile => {
        this.notificationService.success({ title: "profile.save.success.title", message: "profile.save.success.message" });
        this.profileService.setProfile(this.profile);
        this.router.navigate(['profile']);

      }, error => {
        console.log('Something wrong happened...');
      });
  }

  cancel(){
    let profile  = <Profile>{};
    this.initializeFields(profile);
    this.profile = Object.assign(profile, this.profileService.getProfile());

  }

  changePassword() {
    this.profileService.changePassword(this.profile).subscribe( profile => {
        this.notificationService.success({ title: "profile.password.success.title", message: "profile.password.success.message" });
        this.password.reset();
        this.passwordConfirmation.reset();

      }, error => {
        console.log('Something wrong happened...');
      });
  }

  initializeFields(profile: Profile){
    if(_.isNil(profile.gender)){
      profile.gender = '';
    }
    if(_.isNil(profile.race)){
      profile.race = '';  
    }
    return profile;
  }

}

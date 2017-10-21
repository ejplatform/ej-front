import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  profile: Profile;

  genderOptions = [
    {id: 1, name: "Mulher"},
    {id: 2, name: "Home"},
    {id: 3, name: "Mulher Cis"},
    {id: 4, name: "Homem Cis"},
    {id: 5, name: "Agênero"},
  ];
  
  skinColorOptions = [
    {id: 1, name: "Preta"},
    {id: 2, name: "Parda"},
    {id: 3, name: "Branca"},
    {id: 4, name: "Amarela"},
    {id: 5, name: "Indígena"},
    {id: 5, name: "Não sei"},
    {id: 5, name: "Não declarada"},
  ];

  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) {

    this.profile = this.profileService.getProfile();
    console.log(this.profile);
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
    this.profile.gender = '';
    this.profile.skin_color = '';
  }

  save() {
    this.profileService.save(this.profile).subscribe( profile => {
        // this.notificationService.success({ title: "account.register.success.title", message: "account.register.success.message" });
        console.log('Profile saved');
        this.profileService.setProfile(this.profile);
        this.router.navigate(['profile']);

      }, error => {
        console.log('Something wrong happened...');
      });
  }


}

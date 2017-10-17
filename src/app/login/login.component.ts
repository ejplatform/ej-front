import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, SignInData } from 'angular2-token';

import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  profile: Profile;
  
  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router) {

    this.profile = this.profileService.getProfile();
    if(this.profile){
      this.router.navigate(['']);
    }else{
      this.profile = new Profile();
    }
    
  }

  login() {
    this.authService.signIn(this.profile).subscribe((response) => {
      this.profileService.get().subscribe( profile => {
        this.profileService.setProfile(profile);
        this.profile = profile;
        this.router.navigate(['']);
      });
    });
  }

}

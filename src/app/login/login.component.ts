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
  // providers: [ProfileService,AuthService],
})
export class LoginComponent implements OnInit {

  profile: Profile;
  signInData: SignInData = <SignInData>{};
  
  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router) {
    console.log('LoginComponent: constructor', this.profile);
    
    if(!this.profile){
      this.profile = new Profile();
    }
  }

  ngOnInit() {
    if (this.profileService.getProfile()) {
      // this.router.navigate(['/dashboard']);
    }
  }


  signIn() {
    console.log('LoginComponent: signIn');
    this.authService.signIn(this.profile).subscribe(
        response => {
          console.log('LoginComponent: signIn - subscribe', response);
            // const profile = <Profile>response.json().data;
            this.profileService.setProfile(response);
            // this.router.navigateByUrl('/');
        },
    );
  }
}

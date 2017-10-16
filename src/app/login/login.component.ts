import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, SignInData } from 'angular2-token';

import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ProfileService],
})
export class LoginComponent implements OnInit {

  profile: Profile;
  signInData: SignInData = <SignInData>{};
  
  constructor(private _tokenService: Angular2TokenService, private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    if (this.profileService.getProfile()) {
      this.router.navigate(['/dashboard']);
    }
  }


  signIn() {
    console.log('LoginComponent: signIn');
    this._tokenService.signIn(this.signInData).subscribe(
        response => {
          console.log('testandoooooo', response);
            const profile = <Profile>response.json().data;
            this.profileService.setProfile(profile);
            this.router.navigateByUrl('/');
        },
    );
  }
}

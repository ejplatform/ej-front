import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
    selector: 'logout',
    template: '',
})
export class LogoutComponent {

  profile: Profile;

  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router) { 
    this.authService.signOut().subscribe(
      response => {
        this.profileService.setProfile(null);
        this.profile = null;
        this.router.navigate(['']);
      }, error => {
        console.log(error);
        this.router.navigate(['']);
      },
    );
  }
  
}

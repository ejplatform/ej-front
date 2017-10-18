import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'logout',
    template: '',
})
export class LogoutComponent {

  profile: Profile;

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.signOut().subscribe(
      response => {
        this.router.navigate(['']);
      }, error => {
        console.log(error);
        this.router.navigate(['']);
      },
    );
  }
  
}

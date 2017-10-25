import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, SignInData } from 'angular2-token';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {

  profile: Profile;
  bsModalRef: BsModalRef;
  loggedIn = new EventEmitter();

      
  @ViewChild('nameErrors') nameErrors;
  @ViewChild('emailErrors') emailErrors;
  @ViewChild('passwordErrors') passwordErrors;
  @ViewChild('passwordConfirmationErrors') passwordConfirmationErrors;
      
  constructor(private authService: AuthService, private profileService: ProfileService, 
    private modal: BsModalRef, private router: Router) {
    this.bsModalRef = modal;
    this.profile = new Profile();
  }

  register() {
    this.profile.password1 = this.profile.password;
    this.profile.password2 = this.profile.password_confirmation;
    this.authService.signUp(this.profile).subscribe((response) => {
      this.profileService.get().subscribe( profile => {
        profile.id = profile.pk;
        this.profile = profile;
        this.profileService.setProfile(this.profile);        
        this.bsModalRef.hide();
        this.loggedIn.emit();
        this.router.navigate(['conversations']);
      });
    }, error => this.handleError(error));
  }

  handleError(error: any){
    const errors = error.json();
    console.log(errors);
    this.nameErrors.setErrors(errors['name']);
    this.emailErrors.setErrors(errors['email']);
    this.passwordErrors.setErrors(errors['password1']);
    this.passwordConfirmationErrors.setErrors(errors['non_field_errors']);
  }

}

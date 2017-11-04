import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { SocialFacebookService } from '../services/social-facebook.service';
import { NotificationService } from '../services/notification.service';

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

  constructor(private authService: AuthService, private profileService: ProfileService, private notificationService: NotificationService,
    private socialFacebookService: SocialFacebookService, private modal: BsModalRef, private router: Router) {
    this.bsModalRef = modal;
    this.profile = new Profile();
  }

  register() {
    this.profile.password1 = this.profile.password;
    this.profile.password2 = this.profile.password_confirmation;
    this.authService.signUp(this.profile).subscribe((response) => {
      this.profileService.me().subscribe( profile => {
        // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', profile);

        // this.profile = profile;
        // console.log('ggggggggggggggggggggggggggggg', this.profile);
        // this.profileService.setProfile(this.profile);
        // this.loggedIn.emit();
        // this.bsModalRef.hide();
        // this.router.navigate(['conversations']);
        this.handleloginSuccess();
        
      });
    }, error => this.handleError(error));
  }

  loginWithFacebook(){
    this.socialFacebookService.login();
    this.authService.loginSuccess.subscribe(profile => {
      this.handleloginSuccess();
    });
  }

  handleloginSuccess(){
    this.profileService.me().subscribe( profile => {
      this.profileService.setProfile(this.profile);
      this.bsModalRef.hide();
      this.loggedIn.emit();
      this.notificationService.success({ title: "registration.success.title", message: "registration.success.message" });
      // this.router.navigate(['conversations']);
    });
  }

  handleError(error: any){
    const errors  = _.isObject(error.error) ? error.error : JSON.parse(error.error);
    
    console.log(errors);
    this.nameErrors.setErrors(errors['name']);
    this.emailErrors.setErrors(errors['email']);
    this.passwordErrors.setErrors(errors['password1']);
    this.passwordConfirmationErrors.setErrors(errors['non_field_errors']);
  }

}

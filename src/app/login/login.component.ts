import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, SignInData } from 'angular2-token';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { SocialFacebookService } from '../services/social-facebook.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  profile: Profile;
  bsModalRef: BsModalRef;
  loggedIn = new EventEmitter();

  @ViewChild('passwordErrors') passwordErrors;
  @ViewChild('emailErrors') emailErrors;

  constructor(private authService: AuthService, private profileService: ProfileService, 
    private socialFacebookService: SocialFacebookService, private notificationService: NotificationService, 
    private modal: BsModalRef, private router: Router) {
      
    this.bsModalRef = modal;
    this.profile = new Profile();

  }

  login() {
    this.authService.signIn(this.profile).subscribe((response) => {
      this.handleloginSuccess();
    }, error => this.handleError(error));
  }

  loginWithFacebook(){
    this.socialFacebookService.login();
    this.authService.loginSuccess.subscribe(profile => {
      this.handleloginSuccess();
    });
  }

  handleError(error: any){
    let errors  = _.isObject(error.error) ? error.error : JSON.parse(error.error);
    
    this.emailErrors.setErrors(errors['email']);
    this.passwordErrors.setErrors(errors['password']);
    this.passwordErrors.setErrors(errors['non_field_errors']);
  }

  handleloginSuccess(){
    this.profileService.me().subscribe( profile => {
      this.profileService.setProfile(profile);
      this.bsModalRef.hide();
      this.loggedIn.emit();
      this.notificationService.success({ title: "login.success.title", message: "login.success.message" });
      // this.router.navigate(['conversations']);
    }, error => {
      this.handleError(error);
    });
  }

}

import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService, SignInData } from 'angular2-token';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

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
    const errors = error.json();
    this.emailErrors.setErrors(errors['email']);
    this.passwordErrors.setErrors(errors['password']);
    this.passwordErrors.setErrors(errors['non_field_errors']);
  }

  handleloginSuccess(){
    this.profileService.get().subscribe( profile => {
      profile.id = profile.pk;
      this.profileService.setProfile(this.profile);        
      this.bsModalRef.hide();
      this.loggedIn.emit();
      this.notificationService.success({ title: "login.success.title", message: "login.success.message" });
      this.router.navigate(['conversations']);
    });
  }

}

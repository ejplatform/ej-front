import { Component, OnInit, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { SocialFacebookService } from '../services/social-facebook.service';
import { RegistrationComponent  } from '../registration/registration.component';
import { RecoverPasswordComponent  } from '../recover-password/recover-password.component';
import { TwitterService } from '../services/twitter.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  profile: Profile;
  bsModalRef: BsModalRef;
  bsRegistrationModalRef: BsModalRef;
  loggedIn = new EventEmitter();

  @ViewChild('passwordErrors') passwordErrors;
  @ViewChild('emailErrors') emailErrors;

  constructor(private authService: AuthService, private profileService: ProfileService,
    private socialFacebookService: SocialFacebookService, private modalService: BsModalService, private twitterService: TwitterService,
    private notificationService: NotificationService, private modal: BsModalRef, private router: Router) {

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

  openRegistration() {
    this.bsModalRef.hide();
    this.bsRegistrationModalRef = this.modalService.show(RegistrationComponent, { class: 'modal-lg' });
    this.bsRegistrationModalRef.content.loggedIn.subscribe(() => {
      console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
      this.profile = this.profileService.getProfile();
      this.loggedIn.emit();
      this.profileService.profileChangeEvent.emit(this.profile);
    });
  }

  openRecoverPassword() {
    this.bsModalRef.hide();
    this.bsRegistrationModalRef = this.modalService.show(RecoverPasswordComponent, { class: 'modal-lg' });
  }

  loginWithTwitter() {
    const windowRef: Window = window.open(
                                'http://localhost:8000/accounts/twitter/login/?next=%2Fapi%2Fprofile%2Fclose',
                                'twitter-window',
                                'menubar=false,toolbar=false,location=false');
  }

  @HostListener('window:message', ['$event'])
  getPolisMessage(event) {
    console.log(event);
    if (event.data.xid !== undefined) {
      this.authService.getToken().subscribe( (key: any) => {
        this.authService.loginSuccessCallback(key);
      }, (error: any) => {
        this.authService.loginFailedCallback(error);
      });
    }
  }

  handleError(error: any){
    const errors  = _.isObject(error.error) ? error.error : JSON.parse(error.error);

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
    }, error => {
      this.handleError(error);
    });
  }

}

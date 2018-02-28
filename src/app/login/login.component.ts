import { Component, OnInit, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { ProfileService } from '../services/profile.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { SocialFacebookService } from '../services/social-facebook.service';
import { RegistrationComponent  } from '../registration/registration.component';
import { RecoverPasswordComponent  } from '../recover-password/recover-password.component';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  profile: Profile;
  bsModalRef: any;
  bsRegistrationModalRef: any;
  loggedIn = new EventEmitter();

  @ViewChild('passwordErrors') passwordErrors;
  @ViewChild('emailErrors') emailErrors;
  socialErrors: string;

  constructor(private authService: AuthService, private profileService: ProfileService,
    private socialFacebookService: SocialFacebookService, private modalService: NgbModal,
    public activeModal: NgbActiveModal, private toastService: ToastService,
    private sessionService: SessionService, private router: Router) {

    this.bsModalRef = activeModal;
    this.profile = new Profile();

  }

  login() {
    // Ensure that no leftover cookies interfere with the login
    // FIXME: this call should not be necessary and must be removed when csrftoken problems are no longer a concern
    this.authService.cookieReset().subscribe(() => {
      this.authService.signIn(this.profile).subscribe((response) => {
        this.handleloginSuccess();
      }, error => this.handleError(error));
    });
  }

  loginWithFacebook() {
    this.authService.cookieReset().subscribe();
    this.socialFacebookService.login();

    this.socialFacebookService.loginReturn.subscribe((data) => {
      if (data.error) {
        this.handleSocialError('Já existe um usuário registrado com o seu email do Facebook');
      }
    }, error => {
      // handle request errors here
    });

    this.authService.loginSuccess.subscribe(profile => {
      this.handleloginSuccess();
    }, error => {
      // handle request errors here
    });
  }

  openRegistration() {
    this.sessionService.setTourStep('Registration');
  }

  openRecoverPassword() {
    this.sessionService.setTourStep('RecoverPassword');
  }

  loginWithTwitter() {
    this.authService.cookieReset().subscribe();
    const windowRef: Window = window.open(
                                '/accounts/twitter/login/?next=%2Fapi%2Fprofile%2Fclose',
                                'twitter-window',
                                'menubar=false,toolbar=false');

    const that = this;
    const popupTick = setInterval(function() {
      if (windowRef.closed) {
        clearInterval(popupTick);

        that.authService.getToken().subscribe((key: any) => {
          that.authService.loginSuccessCallback({ 'key': key });
          that.handleloginSuccess();
        }, (error: any) => {
          that.handleError({ 'error': {'non_field_errors': 'Erro ao logar com o Twitter'} });
        });
      }
    }, 500);
  }

  handleError(error: any) {
    const errors  = _.isObject(error.error) ? error.error : JSON.parse(error.error);

    this.emailErrors.setErrors(errors['email']);
    this.passwordErrors.setErrors(errors['password']);
    this.passwordErrors.setErrors(errors['non_field_errors']);
  }

  handleSocialError(error: any) {
    this.socialErrors = error;
  }

  handleloginSuccess() {
    // Get profile info from the API
    this.profileService.me().subscribe( profile => {
      this.profileService.setProfile(profile);
      this.bsModalRef.close();
      this.loggedIn.emit();
      this.toastService.success({ title: 'login.success.title', message: 'login.success.message' });
    }, error => {
      this.handleError(error);
    });
  }

}

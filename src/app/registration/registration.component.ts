import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { Tour } from '../gamification/shared/tour-model';
import { SocialFacebookService } from '../services/social-facebook.service';
import { ToastService } from '../services/toast.service';
import { LoginComponent } from '../login/login.component';
import { SessionService } from '../services/session.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {

  profile: Profile;
  loginModalRef: any;
  loggedIn = new EventEmitter();
  socialErrors: string;
  category: Category;

  @ViewChild('nameErrors') nameErrors;
  @ViewChild('emailErrors') emailErrors;
  @ViewChild('passwordErrors') passwordErrors;
  @ViewChild('passwordConfirmationErrors') passwordConfirmationErrors;

  constructor(private categoryService: CategoryService, private authService: AuthService, private profileService: ProfileService,
    private toastService: ToastService, public activeModal: NgbActiveModal, private socialFacebookService: SocialFacebookService,
    private sessionService: SessionService, private router: Router, private modalService: NgbModal) {
    this.profile = new Profile();
    this.category = this.categoryService.getCurrent();

    this.categoryService.categoryChangeEvent.subscribe((category: Category) => {
      this.category = category ? category : null;
    });
  }

  register() {
    this.profile.password1 = this.profile.password;
    this.profile.password2 = this.profile.password_confirmation;
    this.profile.tour_step = (!this.category || (this.category && this.category.has_tour)) ? Tour.STEP_TWO : Tour.STEP_FINISH;
    this.authService.signUp(this.profile).subscribe((response) => {
      this.handleloginSuccess();
    }, error => this.handleError(error));
  }

  loginWithFacebook() {
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

  loginWithTwitter() {
    const windowRef: Window = window.open(
      '/accounts/twitter/login/?next=%2Fapi%2Fprofile%2Fclose',
      'twitter-window',
      'menubar=false,toolbar=false');

    const that = this;
    const popupTick = setInterval(function () {
      if (windowRef.closed) {
        clearInterval(popupTick);

        that.authService.getToken().subscribe((key: any) => {
          that.authService.loginSuccessCallback({ 'key': key });
          that.handleloginSuccess();
        }, (error: any) => {
          that.handleError(error);
        });
      }
    }, 500);
  }

  openLogin() {
    this.activeModal.close();
    this.modalService.open(LoginComponent);
  }

  handleloginSuccess() {
    this.loggedIn.emit();
    this.activeModal.close();
    this.toastService.success({ title: 'registration.success.title', message: 'registration.success.message' });
  }

  handleError(error: any) {
    const errors = _.isObject(error.error) ? error.error : JSON.parse(error.error);

    console.log(errors);
    this.nameErrors.setErrors(errors['name']);
    this.emailErrors.setErrors(errors['email']);
    this.passwordErrors.setErrors(errors['password1']);
    this.passwordConfirmationErrors.setErrors(errors['non_field_errors']);
  }

  handleSocialError(error: any) {
    this.socialErrors = error;
  }

}

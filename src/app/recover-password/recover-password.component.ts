import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { SocialFacebookService } from '../services/social-facebook.service';
import { ToastService } from '../services/toast.service';
import { RegistrationComponent } from '../registration/registration.component';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {

  profile: Profile;
  registrationModalRef: any;

  constructor(private authService: AuthService, private profileService: ProfileService, private sessionService: SessionService,
    public activeModal: NgbActiveModal, private toastService: ToastService, private modalService: NgbModal, private router: Router) {
    this.profile = new Profile();
  }

  recover() {
    this.authService.reset(this.profile).subscribe((response) => {
      this.activeModal.close();
      this.toastService.success({ title: 'recover-password.success.title', message: 'recover-password.success.message' });
    }, error => {
      console.log(error);
    });
  }
}

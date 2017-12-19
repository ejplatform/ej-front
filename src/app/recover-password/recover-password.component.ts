import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { SocialFacebookService } from '../services/social-facebook.service';
import { ToastService } from '../services/toast.service';
import { RegistrationComponent  } from '../registration/registration.component';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {

  profile: Profile;
  bsModalRef: any;
  bsRegistrationModalRef: any;
  
  constructor(private authService: AuthService, private profileService: ProfileService, 
    public activeModal: NgbActiveModal, private toastService: ToastService, private modalService: NgbModal, private router: Router) {
    this.profile = new Profile();
    this.bsModalRef = activeModal;
  }

  recover() {
    this.authService.reset(this.profile).subscribe((response) => {
        this.bsModalRef.close();
        this.toastService.success({ title: "recover-password.success.title", message: "recover-password.success.message" });
    }, error =>{
      console.log(error);
    });
  }

  openRegistration() {
    this.bsModalRef.close();
    this.bsRegistrationModalRef = this.modalService.open(RegistrationComponent);
    this.bsRegistrationModalRef.content.loggedIn.subscribe(() => {
      this.profile = this.profileService.getProfile();
      this.profileService.profileChangeEvent.emit(this.profile);
    });
  }
}

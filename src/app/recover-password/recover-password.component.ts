import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { SocialFacebookService } from '../services/social-facebook.service';
import { NotificationService } from '../services/notification.service';
import { RegistrationComponent  } from '../registration/registration.component';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {

  profile: Profile;
  bsModalRef: BsModalRef;
  bsRegistrationModalRef: BsModalRef;
  
  constructor(private authService: AuthService, private profileService: ProfileService, 
    private notificationService: NotificationService, private modalService: BsModalService,
     private modal: BsModalRef, private router: Router) {
    this.bsModalRef = modal;
    this.profile = new Profile();
  }

  recover() {
    this.authService.reset(this.profile).subscribe((response) => {
        this.bsModalRef.hide();
        this.notificationService.success({ title: "recover-password.success.title", message: "recover-password.success.message" });
    }, error =>{
      console.log(error);
    });
  }

  openRegistration() {
    this.bsModalRef.hide();
    this.bsRegistrationModalRef = this.modalService.show(RegistrationComponent, { class: 'modal-lg' });
    this.bsRegistrationModalRef.content.loggedIn.subscribe(() => {
      this.profile = this.profileService.getProfile();
      this.profileService.profileChangeEvent.emit(this.profile);
    });
  }
}

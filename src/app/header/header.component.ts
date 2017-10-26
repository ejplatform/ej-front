import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router } from '@angular/router';
import * as _ from 'lodash' 
import { FacebookService, LoginResponse } from 'ngx-facebook';


import { ProfileService } from '../services/profile.service';
import { SocialFacebookService } from '../services/social-facebook.service';
import { LoginComponent  } from '../login/login.component';
import { RegistrationComponent  } from '../registration/registration.component';
import { Profile } from '../models/profile';
import { GlobalState } from '../global.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isMenuCollapsed: boolean = false;
  bsModalRef: BsModalRef;
  @Input() profile: Profile;

  constructor(private _state: GlobalState, private profileService: ProfileService, private modalService: BsModalService, 
    private router: Router,
    private fb: FacebookService,
    private socialFacebookService: SocialFacebookService ) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

  }

  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  isLogged(){
    return _.isObject(this.profile);
  }

  openLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent, { class: 'modal-lg' });
    this.bsModalRef.content.loggedIn.subscribe(() => {
      this.profile = this.profileService.getProfile();
      this.profileService.profileChangeEvent.emit(this.profile);
    });
  }
  loginWithFacebook(){
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    this.socialFacebookService.login();
    console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
  }

  openRegistration() {
    this.bsModalRef = this.modalService.show(RegistrationComponent, { class: 'modal-lg' });
    this.bsModalRef.content.loggedIn.subscribe(() => {
      this.profile = this.profileService.getProfile();
      this.profileService.profileChangeEvent.emit(this.profile);
    });
  }

}

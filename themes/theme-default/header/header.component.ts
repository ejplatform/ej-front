import { Component } from '@angular/core';
import { Hotspot } from '../../../src/app/hotspots/hotspot.decorator';
import { Profile } from '../../../src/app/models/profile';
import { ProfileService } from '../../../src/app/services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../src/app/login/login.component';
import { RegistrationComponent } from '../../../src/app/registration/registration.component';

import * as _ from 'lodash';

@Component({
  selector: 'theme-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@Hotspot('theme_header')
export class HeaderComponent {

  profile: Profile;

  constructor( private profileService: ProfileService, private modalService: NgbModal) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  isLogged() {
    return (_.isObject(this.profile) && _.isNumber(this.profile.id));
  }

  openLogin() {
    const bsModalRef = this.modalService.open(LoginComponent);
    bsModalRef.componentInstance.loggedIn.subscribe(() => {
      this.profile = this.profileService.getProfile();
      this.profileService.profileChangeEvent.emit(this.profile);
      window.location.reload();
    });
  }

  openRegistration() {
    const bsModalRef = this.modalService.open(RegistrationComponent);
    bsModalRef.componentInstance.loggedIn.subscribe(() => {
      this.profile = this.profileService.getProfile();
      this.profileService.profileChangeEvent.emit(this.profile);
      window.location.reload();
    });
  }

}

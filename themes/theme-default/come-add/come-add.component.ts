import { Component } from '@angular/core';
import { Hotspot } from '../../../src/app/hotspots/hotspot.decorator';
import { Profile } from '../../../src/app/models/profile';
import { ProfileService } from '../../../src/app/services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from '../../../src/app/registration/registration.component';
import * as _ from 'lodash';


@Component({
  selector: 'app-come-add',
  templateUrl: './come-add.component.html',
  styleUrls: ['./come-add.component.scss']
})
@Hotspot('theme_come_add')
export class ComeAddComponent {

  profile: Profile;

  constructor(private profileService: ProfileService, private modalService: NgbModal) {
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  isLogged() {
    return (_.isObject(this.profile) && _.isNumber(this.profile.id));
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

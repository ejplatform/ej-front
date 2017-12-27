import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  profile: Profile;
  
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService) { 
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
  }

  ngOnInit() {
  }

}

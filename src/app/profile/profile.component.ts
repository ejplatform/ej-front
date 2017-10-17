import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  
  constructor(private profileService: ProfileService, private authService: AuthService) {

    this.profile = this.profileService.getProfile();
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
  }

  save(value) {
    console.log('ProfileComponent: save - ', value, this.profile);
    // this.profileService.save(this.profile).subscribe((profile: Profile) => {
      // this.profile = profile;
    // });
  }

}

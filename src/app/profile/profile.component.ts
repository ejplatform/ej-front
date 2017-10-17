import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  // providers: [ProfileService],
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  // @Input() profile: Profile;
  
  constructor(private profileService: ProfileService) {
    // FIXME remove this code when login service be ready
    // this.profileService.get(1).subscribe((profile: Profile) => {
    //   this.profile = profile;
    // });
    this.profile = this.profileService.getProfile();
    
    this.profileService.profileChangeEvent.subscribe(profile => {
      console.log('ProfileComponent: constructor - profileChangeEvent', profile);
      this.profile = profile;
    });
    console.log('ProfileComponent: constructor - ', this.profile);  
  }

  ngOnInit() {
  }

  save(value) {
    console.log('http.service: ', value, this.profile);
    this.profileService.save(this.profile).subscribe((profile: Profile) => {
      this.profile = profile;
    });
  }

}

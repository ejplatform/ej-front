import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../models/profile';
// import { ProfileService } from '../services/profile.service';
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css'],
})
export class EmbedComponent implements OnInit {

  // profile: Profile;
  
  constructor() {

    // this.profile = this.profileService.getProfile();
    // this.profileService.profileChangeEvent.subscribe(profile => {
    //   this.profile = profile;
    // });
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  // providers: [ProfileService],  
})
export class NavigationBarComponent implements OnInit {

  profile: Profile;
  
  constructor(private profileService: ProfileService) {
    this.profileService.profileChangeEvent.subscribe(profile => {
      console.log('NavigationBarComponent: constructor - profileChangeEvent', profile);
      this.profile = profile;
    });
    console.log('NavigationBarComponent: constructor - ', this.profile);    
  }

  ngOnInit() {
  }

}

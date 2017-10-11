import { Component, OnInit } from '@angular/core';
import { Profile }     from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService],
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  
  constructor(private profileService: ProfileService) { 
    // this.profileService.get(1).subscribe((profile: Profile) => {
    //   this.profile = profile;
    // });
    
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash' 

import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  @Input() profile: Profile;
  
  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    if(_.isUndefined(this.profile.image)){
      this.profile.image = '/assets/images/icons/profile_icon.svg';
    }
  }

}

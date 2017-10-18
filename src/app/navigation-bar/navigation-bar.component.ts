import { Component, OnInit, Input } from '@angular/core';
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
  }

}

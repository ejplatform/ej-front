import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { GlobalState } from '../global.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ProfileService],  
})
export class HeaderComponent implements OnInit {

  isMenuCollapsed: boolean = false;
  profile: Profile;

  constructor(private _state: GlobalState, private profileService: ProfileService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      console.log('HeaderComponent: constructor isCollapsed subscribe ', isCollapsed);
      
      this.isMenuCollapsed = isCollapsed;
    });

    this.profile = this.profileService.getProfile();    
    
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
  }

  toggleMenu() {
    console.log('executando toggleMenu');
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

}
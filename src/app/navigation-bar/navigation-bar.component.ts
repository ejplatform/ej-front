import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash' 

import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { GlobalState } from '../global.state';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  @Input() profile: Profile;
  isMenuCollapsed: boolean = false;
  static MAX_SIZE_FOR_AUTOMATIC_TOGGLE = 640
  
  constructor(private _state: GlobalState,  private profileService: ProfileService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }
 
  ngOnInit() {  }

  toggleMenu() {
    if(window.innerWidth > NavigationBarComponent.MAX_SIZE_FOR_AUTOMATIC_TOGGLE)
      return false 

    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

}

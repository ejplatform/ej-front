import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { GlobalState } from '../global.state';
import * as _ from 'lodash' 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isMenuCollapsed: boolean = false;
  @Input() profile: Profile;

  constructor(private _state: GlobalState, private profileService: ProfileService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  isLogged(){
    return _.isObject(this.profile);
  }

}

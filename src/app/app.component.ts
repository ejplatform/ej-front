import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/profile';
import { GlobalState } from './global.state';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProfileService],
})
export class AppComponent implements OnInit  {

  title = 'app';
  profile: Profile;
  isMenuCollapsed: boolean = false;
  alreadeyCollapsed: boolean = false;

  constructor(private _state: GlobalState, private translate: TranslateService, private profileService: ProfileService) {
    translate.setDefaultLang('pt');
    translate.use('pt');

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      if(!this.isMenuCollapsed && isCollapsed){
        this.alreadeyCollapsed = false;

      }else{
        this.alreadeyCollapsed = true;
      }
      this.isMenuCollapsed = isCollapsed;
    });

  }

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  isLogged(){
    return _.isObject(this.profile);
  }

  onActivate(e) {
    window.scrollTo(0, 0);
  }

  hideNavigationBar(e, isCollapsed){
    if(window.innerWidth > NavigationBarComponent.MAX_SIZE_FOR_AUTOMATIC_TOGGLE)
      return false 
    
    if(this.alreadeyCollapsed && isCollapsed){
      this.isMenuCollapsed = !this.isMenuCollapsed;

      this.alreadeyCollapsed = true;
      this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }
    this.alreadeyCollapsed = !this.alreadeyCollapsed;
  }
}

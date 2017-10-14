import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/profile';
import { GlobalState } from './global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProfileService],  
})
export class AppComponent {
  title = 'app';
  private profile: Profile;
  isMenuCollapsed: boolean = false;
  
  constructor(private _state: GlobalState, private translate: TranslateService, private profileService: ProfileService) {
    translate.setDefaultLang('pt');
    translate.use('pt');

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

  }

  isLogged(){
    return true;
    // Make the loggin works and uncomment this code
    // if(this.profile){
    //   return true;
    // } else {
    //   return false;      
    // }
  }

}

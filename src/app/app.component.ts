import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/profile';
import { GlobalState } from './global.state';
import { Angular2TokenService } from 'angular2-token';

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
  
  constructor(private _state: GlobalState, private translate: TranslateService, private profileService: ProfileService,
    private _tokenService: Angular2TokenService) {
    translate.setDefaultLang('pt');
    translate.use('pt');

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

    // this._tokenService.init({
    //   apiBase:                    'https://ej.brasilqueopovoquer.org.br',
    //   apiPath:                    null,

    //   signInPath:                 'rest-auth/login/',
    //   signInRedirect:             null,
    //   // signInStoredUrlStorageKey:  null,

    //   // signOutPath:                'auth/sign_out',
    //   // validateTokenPath:          'auth/validate_token',
    //   // signOutFailedValidate:      false,

    //   // registerAccountPath:        'auth',
    //   // deleteAccountPath:          'auth',
    //   // registerAccountCallback:    window.location.href,

    //   // updatePasswordPath:         'auth',
    //   // resetPasswordPath:          'auth/password',
    //   // resetPasswordCallback:      window.location.href,

    //   // oAuthBase:                  window.location.origin,
    //   // oAuthPaths: {
    //   //     github:                 'auth/github'
    //   // },
    //   // oAuthCallbackPath:          'oauth_callback',
    //   // oAuthWindowType:            'newWindow',
    //   // oAuthWindowOptions:         null,

    //   // userTypes:                  null,

    //   // globalOptions: {
    //   //     headers: {
    //   //         'Content-Type':     'application/json',
    //   //         'Accept':           'application/json'
    //   //     }
    //   // }
    // });
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

import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class SocialFacebookService {

  public loginReturn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService, private fb: FacebookService) {

    const initParams: InitParams = {
      appId: environment.facebookAppId,
      xfbml: true,
      version: 'v2.10'
    };

    fb.init(initParams);
  }

  login() {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile, user_friends, email'
    };

    this.fb.login(loginOptions).then((response: LoginResponse) => {
        this.authService.signInFacebook(response.authResponse.accessToken).subscribe(
          (resp) => this.loginReturn.emit(resp),
          (error) => this.loginReturn.emit(error)
        );
    }).catch((error: any) => {
        console.error(error);
    });
  }
}

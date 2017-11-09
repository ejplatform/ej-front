import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams } from 'ngx-facebook';
import { LoginResponse } from 'ngx-facebook';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class SocialFacebookService {

  public loginReturn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService, private fb: FacebookService) {

    let initParams: InitParams = {
      appId: environment.facebookAppId,
      xfbml: true,
      version: 'v2.10'
    };

    fb.init(initParams);
  }

  login(){
    this.fb.getLoginStatus().then((response:LoginResponse) =>{
      if(response.status != 'connected'){
          this.fb.login().then((response: LoginResponse) => {
              this.authService.signInFacebook(response.authResponse.accessToken).subscribe(
                (resp) => this.loginReturn.emit(resp),
                (error) => this.loginReturn.emit(error)
              );
          }).catch((error: any) =>{
              console.error(error);
          });
      }else {
          this.authService.signInFacebook(response.authResponse.accessToken).subscribe(
            (resp) => this.loginReturn.emit(resp),
            (error) => this.loginReturn.emit(error)
          );
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }
}

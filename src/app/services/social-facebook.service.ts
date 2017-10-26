import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams } from 'ngx-facebook';
import { LoginResponse } from 'ngx-facebook';

@Injectable()
export class SocialFacebookService {

  constructor(private fb: FacebookService) {
    
        let initParams: InitParams = {
          appId: '1757744567588794',
          xfbml: true,
          version: 'v2.10'
        };
    
        fb.init(initParams);
    
    }

    login(){
        this.fb.login()
        .then((response: LoginResponse) => console.log(response))
        .catch((error: any) => console.error(error));
    }

}

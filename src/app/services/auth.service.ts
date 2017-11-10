import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Profile } from '../models/profile';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  public loginSuccess: EventEmitter<any> = new EventEmitter<any>();
  public loginFailed: EventEmitter<any> = new EventEmitter<any>();
  public logoutSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  signOut() {
    const profile: Profile = this.sessionService.currentProfile();
    let fullEndpointUrl = `${environment.apiUrl}/rest-auth/logout/`;
    return this.http.post(fullEndpointUrl, profile).map(
      data => {
        return this.logoutSuccessCallback(profile);
      });
  }

  signIn(profile: Profile) {
    let fullEndpointUrl = `${environment.apiUrl}/rest-auth/login/`;
    return this.http.post(fullEndpointUrl, profile).map(
        data => {
          return this.loginSuccessCallback(data);
        },
        resp => {
          this.loginFailedCallback(resp);}
      );

  }

  reset(profile: Profile) {
    let fullEndpointUrl = `${environment.apiUrl}/rest-auth/password/reset/`;
    return this.http.post(fullEndpointUrl, profile)
  }

  signInFacebook(accessToken: string) {
    console.log('AuthService: signInFacebook', accessToken);
    let fullEndpointUrl = `${environment.apiUrl}/api/auth/facebook/`;
    return this.http.post(fullEndpointUrl, {access_token: accessToken}).map(
        data => {
          console.log('AuthService: signInFacebook - sucesso',data);
          return this.loginSuccessCallback(data);
        },
        resp => {
          console.log('AuthService: signInFacebook - erro',resp);
          this.loginFailedCallback(resp);
        }
      );
  }

  signUp(profile: Profile): Observable<any> {
    let fullEndpointUrl = `${environment.apiUrl}/rest-auth/registration/`;
    return this.http.post(fullEndpointUrl, profile).map(
      data => {
        return this.loginSuccessCallback(data);
      },
      resp => { this.loginFailedCallback(resp);}
    );
  }

  getToken() {
    let fullEndpointUrl = `${environment.apiUrl}/api/profile/key/`;
    return this.http.get(fullEndpointUrl).map(
      (data: any) => {
        return data.key;
      }
    );
  }

  private logoutSuccessCallback(profile: Profile) {
    this.sessionService.destroy();
    this.logoutSuccess.next(profile);
  }

  public loginFailedCallback(response: any): any {
    this.loginFailed.next(response);
    return null;
  }

  public loginSuccessCallback(response: any) {
    const token: string = this.sessionService.setToken(response['key']);
    this.loginSuccess.emit(token);
    return token;
  }
}

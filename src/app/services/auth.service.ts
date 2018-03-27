import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Profile } from '../models/profile';
import { SessionService } from './session.service';
import { ProfileService } from './profile.service';

import { environment } from '../../environments/environment';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  public loginSuccess: EventEmitter<any> = new EventEmitter<any>();
  public loginFailed: EventEmitter<any> = new EventEmitter<any>();
  public logoutSuccess: EventEmitter<any> = new EventEmitter<any>();
  public profile: Profile;

  constructor(private http: HttpClient, private sessionService: SessionService, private profileService: ProfileService) {}

  signOut() {
    const profile: Profile = this.sessionService.currentProfile();
    const fullEndpointUrl = `${environment.apiUrl}/rest-auth/logout/`;
    return this.http.post(fullEndpointUrl, profile).map(
      data => {
        return this.logoutSuccessCallback(profile);
      })
      .catch(error => {
        // Even if the logout endpoint returned an error, local profile and token data must be destroyed
        return Observable.throw(this.logoutSuccessCallback(profile));
      });
  }

  signIn(profile: Profile) {
    const fullEndpointUrl = `${environment.apiUrl}/rest-auth/login/`;
    return this.http.post(fullEndpointUrl, profile).map(
        data => {
          return this.loginSuccessCallback(data);
        },
        resp => {
          this.loginFailedCallback(resp);
        }
      );

  }

  reset(profile: Profile) {
    const fullEndpointUrl = `${environment.apiUrl}/rest-auth/password/reset/`;
    return this.http.post(fullEndpointUrl, profile);
  }

  cookieReset() {
    const fullEndpointUrl = `${environment.apiUrl}/api/profile/reset/`;
    return this.http.get(fullEndpointUrl, {responseType: 'text'});
  }

  signInFacebook(accessToken: string) {
    const fullEndpointUrl = `${environment.apiUrl}/api/auth/facebook/`;
    return this.http.post(fullEndpointUrl, {access_token: accessToken}).map(
        data => {
          return this.loginSuccessCallback(data);
        },
        resp => {
          this.loginFailedCallback(resp);
        }
      );
  }

  signUp(profile: Profile): Observable<any> {
    const fullEndpointUrl = `${environment.apiUrl}/rest-auth/registration/`;
    return this.http.post(fullEndpointUrl, profile).map(
      data => {
        return this.loginSuccessCallback(data);
      },
      resp => {
        this.loginFailedCallback(resp);
      }
    );
  }

  getToken() {
    const fullEndpointUrl = `${environment.apiUrl}/api/profile/key/`;
    return this.http.get(fullEndpointUrl).map(
      (data: any) => {
        return data.key;
      }
    );
  }

  private logoutSuccessCallback(profile: Profile) {
    this.sessionService.destroy();
    this.logoutSuccess.next(profile);
    window.location.reload();
  }

  public loginFailedCallback(response: any): any {
    this.loginFailed.next(response);
    return null;
  }

  public loginSuccessCallback(response: any) {
    const token: string = this.sessionService.setToken(response['key']);
    this.loginSuccess.emit(token);
    this.profileService.me().subscribe( profile => {
      this.profileService.setProfile(profile);
      this.profile = profile;
    });

    return token;
  }
}

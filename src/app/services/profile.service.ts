import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import * as _ from 'lodash'

import { environment } from '../../environments/environment';
import { Profile } from '../models/profile';
import { SessionService } from './session.service';

@Injectable()
export class ProfileService {

  private profile: Profile;

  @Output() profileChangeEvent: EventEmitter<Profile> = new EventEmitter(true);

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  get(profile?: Profile): Observable<Profile> {
    const contextProfile = _.isObject(profile) ? profile : this.profile;
    if(_.isObject(contextProfile) && contextProfile.id){
      let fullEndpointUrl = `${environment.apiUrl}/api/profile/${contextProfile.id}/`;
      return this.http.get<Profile>(fullEndpointUrl);
    }else if(!_.isObject(contextProfile)){
      let fullEndpointUrl = `${environment.apiUrl}/rest-auth/user/`;
      return this.http.get<Profile>(fullEndpointUrl);
    }
  }

  me(): Observable<Profile> {
    let fullEndpointUrl = `${environment.apiUrl}/api/profile/me/`;
    return this.http.get<Profile>(fullEndpointUrl);
  }


  save(profile: Profile): Observable<Profile> {
    let localProfile = new Profile();
    localProfile = Object.assign(localProfile, profile);
    localProfile.image = undefined;

    let fullEndpointUrl = `${environment.apiUrl}/api/profile/${localProfile.id}/`;
    return this.http.put<Profile>(fullEndpointUrl, localProfile);
  }

  saveImage(profile: Profile): Observable<Profile> {
    let formData = new FormData();
    formData.append('image', profile.imageFile);
    
    let fullEndpointUrl = `${environment.apiUrl}/api/profile/${profile.id}/image/`;

    return this.http.post<Profile>(fullEndpointUrl, formData);
  }

  
  changePassword(profile: Profile): Observable<Profile> {
    profile.new_password1 = profile.password;
    profile.new_password2 = profile.passwordConfirmation;
    let fullEndpointUrl = `${environment.apiUrl}/rest-auth/password/change/`;
    return this.http.post<Profile>(fullEndpointUrl, profile);
  }

  setProfile(profile: Profile) {
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', profile);
    this.profile = profile;
    this.sessionService.setProfile(profile);
    this.profileChangeEvent.emit(profile);
  }

  getProfile():Profile {
    this.profile = this.sessionService.currentProfile();
    return this.profile;
  }

}

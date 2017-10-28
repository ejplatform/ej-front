import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import * as _ from 'lodash' 

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
      return this.http.get<Profile>('/api/profile/' + contextProfile.id + '/');
    }else if(!_.isObject(contextProfile)){
      return this.http.get<Profile>('/rest-auth/user/');      
    }
  }

  me(): Observable<Profile> {
    return this.http.get<Profile>('/api/profile/me');
  }


  save(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>('/api/profile/' + profile.id + '/', profile);
  }
  
  setProfile(profile:Profile) {
    this.profile = profile;
    this.sessionService.setProfile(profile);
    this.profileChangeEvent.emit(profile);
  }
  
  getProfile():Profile {
    this.profile = this.sessionService.currentProfile();
    return this.profile;
  }

}

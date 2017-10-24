import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { Profile } from '../models/profile';
import { SessionService } from './session.service';


@Injectable()
export class ProfileService {

  private profile: Profile;

  @Output() profileChangeEvent: EventEmitter<Profile> = new EventEmitter(true);
 
  constructor(private http: HttpClient, private sessionService: SessionService) {}
  
  get(): Observable<Profile> {
    return this.http.get<Profile>('/rest-auth/user/');
  }

  save(profile: Profile): Observable<Profile> {
    // return this.http.put<Profile>('/api/profiles/' + profile.id, profile);
    return this.http.put<Profile>('/rest-auth/user/', profile);
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

import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { Profile } from '../models/profile';
import { SessionService } from './session.service';


@Injectable()
export class ProfileService {

  private profile: Profile;
  
  
  @Output() profileChangeEvent: EventEmitter<Profile> = new EventEmitter(true);
  @Output() tokenChangeEvent: EventEmitter<string> = new EventEmitter(true);
  
  constructor(private http: HttpClient, private sessionService: SessionService) {}
  
  get(): Observable<Profile> {
    return this.http.get<Profile>('/rest-auth/user/');
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

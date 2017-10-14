import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';

import { Profile } from '../models/profile';

@Injectable()
export class ProfileService {
  private profile: Profile;
  
  @Output() profileChangeEvent: EventEmitter<Profile> = new EventEmitter(true);

  constructor (private restangular: Restangular) {}

  get(id: number): Observable<Profile> {
    return this.restangular.one('profiles', id).get();
  }
  save(profile: Profile): Observable<Profile> {
    return this.restangular.one('profiles', profile.id).put({name: profile.name});
  }
  
  setProfile(profile:Profile) {
    this.profile = profile;
    this.profileChangeEvent.emit(profile);
  }
  
  getProfile():Profile {
    return this.profile;
  }

}

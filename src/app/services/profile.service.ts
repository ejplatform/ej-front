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

  login(profile: Profile){
    // lcurl  --data "email=leandronunes@gmail.com&password=leobest04"  https://ej.brasilqueopovoquer.org.br/rest-auth/login/ 
    // {"key":"4224422b5a656856b36a9ed0c2b5641d71f1ee0f"}
  }
  
  setProfile(profile:Profile) {
    this.profile = profile;
    this.profileChangeEvent.emit(profile);
  }
  
  getProfile():Profile {
    return this.profile;
  }

}

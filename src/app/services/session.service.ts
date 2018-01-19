import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Profile } from '../models/profile';

@Injectable()
export class SessionService {
    @Output() sessionChangeEvent: EventEmitter<any> = new EventEmitter(true);
    
  constructor(private localStorageService: LocalStorageService) { }

  destroy() {
      this.localStorageService.clear('currentProfile');
      this.localStorageService.clear('token');
  };

  setProfile(profile: Profile): Profile {
      this.localStorageService.store('currentProfile', profile);
      this.sessionChangeEvent.emit();
      return this.localStorageService.retrieve('currentProfile');
  };

  currentProfile(): Profile {
      return this.localStorageService.retrieve('currentProfile');
  };

  setToken(token: string): string {
      this.localStorageService.store('token', token);
      return this.getToken();
  };

  getToken(): string {
      return this.localStorageService.retrieve('token');
  };

  setTourStep(step: string): string {
    this.localStorageService.store('step', step);
    this.sessionChangeEvent.emit(step);    
    return this.getTourStep();
  };

  getTourStep(): string {
    return this.localStorageService.retrieve('step');
  };

}

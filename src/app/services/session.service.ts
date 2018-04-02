import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Profile } from '../models/profile';
import { Conversation } from '../models/conversation';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SessionService {
    @Output() sessionChangeEvent: EventEmitter<any> = new EventEmitter(true);

    constructor(private localStorageService: LocalStorageService, private cookieService: CookieService) { }

    destroy() {
        this.localStorageService.clear('currentProfile');
        this.localStorageService.clear('token');
    }

    setProfile(profile: Profile): Profile {
        this.localStorageService.store('currentProfile', profile);
        this.sessionChangeEvent.emit();
        return this.localStorageService.retrieve('currentProfile');
    }

    currentProfile(): Profile {
        return this.localStorageService.retrieve('currentProfile');
    }

    setToken(token: string): string {
        this.cookieService.set('token', token);
        return this.getToken();
    }

    getToken(): string {
        return this.cookieService.get('token');
    }

    setTourConversation(conversation: Conversation): Conversation {
        this.localStorageService.store('tourConversation', conversation);
        return this.getTourConversation();
    }

    getTourConversation(): Conversation {
        return this.localStorageService.retrieve('tourConversation');
    }

    destroyTourConversation() {
        this.localStorageService.clear('tourConversation');
    }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../.././../environments/environment';
import { Badge } from './badge-model';


// FIXME remove local storage after api endpoint creation
import * as _ from 'lodash';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';


@Injectable()
export class BadgeService {

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

    public list(): Observable<Badge[]> {
        const fullEndpointUrl = `${environment.apiUrl}/api/gamification/badges/`;
        return this.http.get<Badge[]>(fullEndpointUrl);
    }

    // FIXME Api saving
    // public seen(badge: Badge): Observable<Badge> {
    //     let fullEndpointUrl = `${environment.apiUrl}/api/gamification/badges/`;
    //     return this.http.post<Badge>(fullEndpointUrl,badge);
    // }

    // FIXME remove this method after save this information on backend
    public seen(badge: Badge): Observable<Badge> {
        let levels = this.localStorageService.retrieve('levels');
        if (_.isNil(levels)) {
            levels = {};
        }
        levels[badge.slug + '_' + badge.name] = true;
        this.localStorageService.store('levels', levels);
        return Observable.of(<Badge>{});
    }

    // FIXME remove this method after save this information on backend
    public wasSeen(badge: Badge): boolean {
        const levelName = badge.slug + '_' + badge.name;
        let levels = this.localStorageService.retrieve('levels');
        if (_.isNil(levels)) {
            levels = {};
        }
        return levels[levelName] === true;
    }
}

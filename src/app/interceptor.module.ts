import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import * as Raven from 'raven-js';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { Profile } from './models/profile';
import { ProfileService } from './services/profile.service';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService, private inj: Injector,
    private cookieService: CookieService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.getToken();

    // If there is an API key stored, send it in this request
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Token ' + token) });
    } else {
      // If there is no key, allow cookies to be sent, but only if this is a request for an API key
      if (request.url.includes('/profile/key')) {
        request = request.clone({ withCredentials: true });
      }

    }

    // Send a csrftoken header, if it's the data is available as a cookie
    const csrftoken = this.cookieService.get('csrftoken');
    if (csrftoken) {
      request = request.clone({ headers: request.headers.set('X-CSRFToken', csrftoken) });
    }

    return next.handle(request).catch(error => {
      // HTTP errors must be handled diferently for Sentry
      if (error instanceof HttpErrorResponse) {
        Raven.captureMessage(error.message, {
          level: 'warning',
          extra: { response_body: error.error }
        });
      }

      if ((error.status === 401 || error.status === 403)) {
        const auth = this.inj.get(AuthService);
        const profileService = this.inj.get(ProfileService);
        auth.signOut().subscribe( () => {
          profileService.setProfile(null);
          this.router.navigate(['']);
        }, err => {
          // If the logout call failed, there may be invalid cookies lingering on the browser. Clear them now
          // FIXME: this call should not be necessary and must be removed when csrftoken problems are no longer a concern
          auth.cookieReset().subscribe();
        });
      }

      return Observable.throw(error);
    });

  }
}

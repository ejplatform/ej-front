import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { SessionService } from './services/session.service';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private session: SessionService, private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.session.getToken();

    // If there is an API key stored, send it in this request
    if (token) {
      // API token should never be sent to the polis backend
      if (!request.url.includes('polis.brasilqueopovoquer.org.br')) {
        request = request.clone({headers: request.headers.set('Authorization', 'Token ' + token)});
      }

    } else {

      // If there is no key, allow cookies to be sent, but only if this is a request for an API key
      if (request.url.includes('/profile/key')) {
        request = request.clone({withCredentials: true});
      }

    }

    // Send a csrftoken header, if it's the data is available as a cookie
    // However, don't do it when sending requests to Polis
    const csrftoken = this.cookieService.get('csrftoken');
    if (csrftoken && !request.url.includes('polis.brasilqueopovoquer.org.br')) {
      request = request.clone({headers: request.headers.set('X-CSRFToken', csrftoken)});
    }

    return next.handle(request);
  }
}

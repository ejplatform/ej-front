import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { SessionService } from './services/session.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private session: SessionService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = request;
    const token = this.session.getToken();

    // If there is an API key stored, send it in this request
    if (token) {
      authRequest = request.clone({headers: request.headers.set('Authorization', 'Token ' + token)});
    } else {

      // If there is no key, allow cookies to be sent, but only if this is a request for an API key
      if (authRequest.url.includes('/profile/key')) {
        authRequest = request.clone({withCredentials: true});
      }
    }

    return next.handle(authRequest);

  }
};

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
    if(token){
      authRequest = request.clone({headers: request.headers.set('Authorization', 'Token ' + token)});
    }   

    return next.handle(authRequest);

  }
};

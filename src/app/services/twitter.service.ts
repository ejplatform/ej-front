import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// FIXME unused code. Make twitter login works.
@Injectable()
export class TwitterService {

  constructor(private http: HttpClient) { }

  requestToken(): any {

      // this.http.get('https://api.twitter.com/oauth/request_token');
      return this.http.post('https://api.twitter.com/oauth/request_token', {oauth_callback: 'http://localhost.app.brasilqueopovoquer.org.br:4200/'});
  }
}

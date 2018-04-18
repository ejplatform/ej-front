import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RawHtmlLoaderService {
  constructor(private http: Http) {
  }

  getData(url: string): Promise<string> {
    return this.http.get(url)
      .toPromise()
      .then(res => res.text())
      .catch(error => {
          const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

          //FIXME: send to sentry?
          console.error({
            url: url,
            message: errMsg,
          });
          return Observable.throw(errMsg);
        }
      );
  }
}

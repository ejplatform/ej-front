import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { Tour } from './shared/tour-model';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TourComponent } from './tour.component';
import * as _ from 'lodash';

@Injectable()
export class TourInterceptor implements HttpInterceptor {

  profile: Profile;
  modal: any;

  constructor(private sessionService: SessionService, private router: Router, 
    private modalService: NgbModal, public activeModal: NgbActiveModal) {
    this.profile = this.sessionService.currentProfile();

    this.sessionService.sessionChangeEvent.subscribe(data => {
      this.profile = this.sessionService.currentProfile();
    });
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authRequest = request;
    
    if (!this.profile || (this.profile && (this.profile.tour_step != Tour.STEP_FINISH))) {
      Promise.resolve().then(() => {
        if(_.isNil(this.modal)){
          this.modal = this.modalService.open(TourComponent, { backdrop  : 'static', keyboard  : false });
          this.modal.result.then((data) => {
            this.modal = null;
          });
        }
      });
    }


    return next.handle(authRequest);

  }

};

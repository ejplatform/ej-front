import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { SessionService } from '../../services/session.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from './tour-model';
import { BadgeService } from './badge.service';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TourComponent } from '../tour.component';
import { BadgeComponent } from '../badge/badge.component';

import * as _ from 'lodash';

@Injectable()
export class BadgeInterceptor implements HttpInterceptor {

  profile: Profile;
  modal: any;
  badgeService: any;

  constructor(private sessionService: SessionService, private router: Router, 
    private modalService: NgbModal, public activeModal: NgbActiveModal, private injector: Injector ) {
    this.profile = this.sessionService.currentProfile();
    
    this.sessionService.sessionChangeEvent.subscribe(data => {
      this.profile = this.sessionService.currentProfile();
    });
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.profile && (this.profile.tour_step == Tour.STEP_FINISH) && _.isNil(this.badgeService)) {
      this.badgeService = this.injector.get(BadgeService);

      //FIXME Get only the badge was not seen
      this.badgeService.list().subscribe( badges => {
        this.badgeService = null;
        //FIXME this code will not be necessary after backend works properly
        if(_.isNil(badges)){
          badges = []
        }

        if(_.isNil(this.modal)){
          this.modal = this.modalService.open(BadgeComponent, { backdrop  : 'static', keyboard  : false });
          this.modal.componentInstance.badge = badges[0];
          this.modal.result.then((data) => {
            this.modal = null;
          }, (reason) => {
            this.modal = null;
          });
        }
      });

    }


    return next.handle(request);

  }

};

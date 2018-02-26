import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SessionService } from '../../services/session.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { Tour } from './tour-model';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TourComponent } from '../tour.component';
import * as _ from 'lodash';
import { GlobalState } from '../../global.state';
import { Category } from '../../models/category';

@Injectable()
export class TourInterceptor implements HttpInterceptor {

  profile: Profile;
  category: Category;
  modal: any;

  constructor(private _state: GlobalState, private sessionService: SessionService, private router: Router,
    private modalService: NgbModal, public activeModal: NgbActiveModal) {
    this.profile = this.sessionService.currentProfile();

    this.sessionService.sessionChangeEvent.subscribe(data => {
      this.profile = this.sessionService.currentProfile();
    });

    this._state.subscribe('category.data', (category) => {
      this.category = category ? category : null;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authRequest = request;

    if (!this.profile || (this.profile && (this.profile.tour_step !== Tour.STEP_FINISH))) {
      if (this.category) {
        const step = _.isNil(this.profile) ? '' : this.profile.tour_step;

        if (this.category.has_tour) {
          this.openModal();
        } else if (this.category.is_login_required && (step === '')) {
          this.openModal();
        } else {
          this.modal.close();
        }
      } else {
        this.openModal();
      }
    }


    return next.handle(authRequest);

  }

  openModal() {
    Promise.resolve().then(() => {
      if (_.isNil(this.modal)) {
        this.modal = this.modalService.open(TourComponent, { backdrop: 'static', keyboard: false });
        this.modal.result.then((data) => {
          this.modal = null;
        }, (reason) => {
          this.modal = null;
        });
      }
    });

  }
}

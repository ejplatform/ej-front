import { Injectable, Injector, OnInit } from '@angular/core';
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
import { Category } from '../../models/category';
import { TourService } from './tour.service';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class TourInterceptor implements HttpInterceptor, OnInit {

  profile: Profile;
  category: Category;
  categoryService: CategoryService;
  modal: any;

  constructor( private injector: Injector, private sessionService: SessionService,
    private router: Router, private tourService: TourService,
    private modalService: NgbModal, public activeModal: NgbActiveModal) {
    this.profile = this.sessionService.currentProfile();

    sessionService.sessionChangeEvent.subscribe(data => {
      this.profile = this.sessionService.currentProfile();
      this.checkOrOpenTour();
    });

  }

  ngOnInit() {
    this.categoryService = this.injector.get(CategoryService);

    this.category = this.categoryService.getCurrent();

    this.categoryService.categoryChangeEvent.subscribe((category: Category) => {
      this.category = category;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authRequest = request;
    this.checkOrOpenTour();

    return next.handle(authRequest);

  }

  private checkOrOpenTour() {
    if (this.shouldActiveTour()) {
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
  }

  private shouldActiveTour(): boolean {
    let activateTour: boolean;
    if (_.isNil(this.profile)) {
      activateTour = true;
    } else {
      if(_.isNil(this.profile.tour_step)) {
        this.profile.tour_step = Tour.STEP_TWO
      }
      activateTour = this.tourService.existStep(this.profile.tour_step);
      activateTour = activateTour && (this.profile.tour_step !== Tour.STEP_FINISH);
    }
    return activateTour;
  }

  private openModal() {
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

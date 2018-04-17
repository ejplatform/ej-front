import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SliderModalComponent } from './slider-modal/slider-modal.component';

import * as _ from 'lodash';

import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
})
export class HomeSliderComponent implements OnInit {

  url: string;
  el: HTMLFrameElement;
  private baseUrl: string;
  profile: Profile;
  active_slider = 1;
  bsModalRef: any;

  constructor(private profileService: ProfileService,
              private modalService: NgbModal) {
  }

  ngOnInit() {

    setInterval(() => {
      this.active_slider = this.active_slider < 3 ? this.active_slider + 1 : 1;
    }, 7000);
  }

  openModal(content) {
    this.bsModalRef = this.modalService.open(SliderModalComponent);
    this.bsModalRef.componentInstance.content = content;
  }
}

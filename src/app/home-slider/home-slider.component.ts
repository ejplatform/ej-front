import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SliderModalComponent } from './slider-modal/slider-modal.component';

import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css'],
})
export class HomeSliderComponent implements OnInit {

  url: string;
  el: HTMLFrameElement;
  private baseUrl: string
  profile: Profile;
  active_slider = 1;
  bsModalRef: BsModalRef;

  constructor(private profileService: ProfileService,
              private modalService: BsModalService) {
  }

  ngOnInit() {

    setInterval(() =>{
      this.active_slider = this.active_slider < 3 ? this.active_slider + 1 : 1;
    }, 7000);
  }

  openModal(content) {
    this.bsModalRef = this.modalService.show(SliderModalComponent, { class: 'modal-lg' });
    this.bsModalRef.content.content = content;
  }
}

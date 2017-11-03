import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {
    this.baseUrl = "https://brasilqueopovoquer.hacklab.com.br/";
    this.url = "https://brasilqueopovoquer.hacklab.com.br/";
  }

  ngOnInit() {

    setInterval(() =>{
      console.log('Interval', this.active_slider);
      this.active_slider = this.active_slider < 3 ? this.active_slider + 1 : 1;
    }, 7000);
 
  }
}

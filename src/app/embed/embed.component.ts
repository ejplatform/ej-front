import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css'],
})
export class EmbedComponent implements OnInit {

  url: string;
  el: HTMLFrameElement;
  private baseUrl: string
  profile: Profile;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {
    this.baseUrl = "https://brasilqueopovoquer.hacklab.com.br/";
    this.url = "https://brasilqueopovoquer.hacklab.com.br/";
  }

  ngOnInit() {
    this.profile = this.profileService.getProfile();

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
      this.checkRedirection();
    });

    this.checkRedirection();
    let path = this.route.snapshot.url.map(p => p.path).join("/");
    if(path == 'inicio'){
      path = '';
    }
    this.url = this.baseUrl + path;
  }

  checkRedirection(){
    if(_.isObject(this.profile)){
      this.router.navigate(['conversations']);
    }
  }

  checkHeight(ev: Event) {
    this.el = <HTMLFrameElement>ev.target;
    this.el.height = 4000;
  }

}

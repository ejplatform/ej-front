import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../models/profile';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css'],
})
export class EmbedComponent implements OnInit {

  url: string;
  el: HTMLFrameElement;
  private baseUrl: string
  
  constructor(private route: ActivatedRoute) {
    this.baseUrl = "https://brasilqueopovoquer.org.br/";
    this.url = "https://brasilqueopovoquer.org.br/";
  }

  ngOnInit() {
    let path = this.route.snapshot.url.map(p => p.path).join("/"); 
    if(path == 'inicio'){
      path = '';
    }
    this.url = this.baseUrl + path;
  }

  checkHeight(ev: Event) {
    this.el = <HTMLFrameElement>ev.srcElement;
    this.el.height = 7000 + 'px'; 
  }

}

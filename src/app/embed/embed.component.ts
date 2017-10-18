import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css'],
})
export class EmbedComponent implements OnInit {

  url: string;
  el: HTMLFrameElement;
  
  constructor() {
    // this.url = "http://localhost:3003/";
    this.url = "https://brasilqueopovoquer.org.br/"
  }

  ngOnInit() {
  }

  checkHeight(ev: Event) {
    this.el = <HTMLFrameElement>ev.srcElement;
    this.el.height = 7000 + 'px'; 
  }

}

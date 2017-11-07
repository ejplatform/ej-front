import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash'

@Component({
  selector: 'app-soon',
  templateUrl: './soon.component.html',
  styleUrls: ['./soon.component.scss']
})
export class SoonComponent implements OnInit {

  pageTitle: String;

  constructor() {
  }

  ngOnInit() {
  }
}

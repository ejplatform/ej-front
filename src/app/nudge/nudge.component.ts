import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Nudge } from './shared/nudge-model';

@Component({
  selector: 'app-nudge',
  templateUrl: './nudge.component.html',
})
export class NudgeComponent implements OnInit {

  nudge: Nudge;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.fillNudge();
  }

  fillNudge() {
    this.nudge.title = 'nudge.' + this.nudge.state + '.title'
    this.nudge.imagePath = '/assets/images/nudges/' + this.nudge.state + '.svg'
    this.nudge.detail = 'nudge.' + this.nudge.state + '.detail'
  }

}

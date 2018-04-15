import { Component } from '@angular/core';
import { Hotspot } from '../../../src/app/hotspots/hotspot.decorator';


@Component({
  selector: 'app-come-add',
  templateUrl: './come-add.component.html',
  styleUrls: ['./come-add.component.scss']
})
@Hotspot('theme_come_add')
export class ComeAddComponent {

  constructor() {}

}

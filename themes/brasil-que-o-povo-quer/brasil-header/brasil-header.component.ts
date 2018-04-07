import { Component, ViewEncapsulation } from '@angular/core';
import { Hotspot } from '../../../src/app/hotspot/hotspot.decorator';

@Component({
  selector: 'brasil-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  encapsulation: ViewEncapsulation.None,
})
@Hotspot('theme_header')
export class BrasilHeaderComponent {
}

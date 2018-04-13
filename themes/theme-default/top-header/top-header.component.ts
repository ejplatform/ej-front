import { Component } from '@angular/core';
import { Hotspot } from '../../../src/app/hotspot/hotspot.decorator';

@Component({
  selector: 'theme-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
})
@Hotspot('theme_top_header')
export class TopHeaderComponent {
}

import { Component } from '@angular/core';
import { Hotspot } from '../../../src/app/hotspots/hotspot.decorator';

@Component({
  selector: 'theme-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@Hotspot('theme_header')
export class HeaderComponent {
}

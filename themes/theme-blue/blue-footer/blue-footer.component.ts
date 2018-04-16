import { Component, ViewEncapsulation } from '@angular/core';
import { Hotspot } from '../../../src/app/hotspots/hotspot.decorator';

@Component({
  selector: 'blue-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  encapsulation: ViewEncapsulation.None,
})
@Hotspot('theme_footer')
export class BlueFooterComponent {
}

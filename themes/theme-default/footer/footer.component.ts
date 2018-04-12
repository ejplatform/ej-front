import { Component, Input } from '@angular/core';
import { Hotspot } from '../../../src/app/hotspot/hotspot.decorator';

@Component({
  selector: 'theme-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
@Hotspot('theme_footer')
export class FooterComponent {
}

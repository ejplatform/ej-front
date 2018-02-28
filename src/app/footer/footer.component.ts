import { Component, Input } from '@angular/core';
import { GlobalState } from '../global.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  
  styles: any = null;

  constructor(private _state: GlobalState) {
    this._state.subscribe('category.data', (category) => {
      this.styles = (category && category.customizations) ? category.customizations.styles : null;
    });
  }

}

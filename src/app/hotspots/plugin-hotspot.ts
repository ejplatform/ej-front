import { AfterContentInit } from '@angular/core';
import * as theme from '../../theme';

export abstract class PluginHotspot implements AfterContentInit {

  constructor(protected hotspot: string) { }

  ngAfterContentInit() {
    for (const component of theme.hotspots) {
      if (component.hotspot === this.hotspot) {
        this.addHotspot(component);
      }
    }
  }

  abstract addHotspot(component?: any): any;
}

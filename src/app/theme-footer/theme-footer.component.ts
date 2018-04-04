import { HotspotModule } from './../hotspot/hotspot.module';
import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { PluginHotspot } from '../hotspot/plugin-hotspot';

@Component({
  selector: 'theme-footer',
  template: ''
})
export class ThemeFooterComponent extends PluginHotspot {

  constructor(private viewContainerRef: ViewContainerRef, private factory: ComponentFactoryResolver, ) {
    super('theme_footer');
  }

  addHotspot(component: any) {
    const compFactory = this.factory.resolveComponentFactory(component);
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(compFactory);
  }

}

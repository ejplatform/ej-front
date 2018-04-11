import { Component, ComponentFactoryResolver, ViewContainerRef, Input } from '@angular/core';
import { PluginHotspot } from '../hotspot/plugin-hotspot';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-theme-top-header',
  template: ''
})
export class ThemeTopHeaderComponent extends PluginHotspot {

  constructor(private viewContainerRef: ViewContainerRef, private factory: ComponentFactoryResolver, ) {
    super('theme_top_header');
  }

  addHotspot(component: any) {
    const compFactory = this.factory.resolveComponentFactory( component );
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(compFactory);
    componentRef.changeDetectorRef.detectChanges();

  }

}

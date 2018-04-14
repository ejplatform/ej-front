import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { PluginHotspot } from '../../plugin-hotspot';

@Component({
  selector: 'app-theme-footer',
  template: ''
})
export class ThemeFooterComponent extends PluginHotspot {

  constructor(private viewContainerRef: ViewContainerRef, private factory: ComponentFactoryResolver, ) {
    super('theme_footer');
  }

  addHotspot(component: any) {
    const compFactory = this.factory.resolveComponentFactory(component);
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(compFactory);
    componentRef.changeDetectorRef.detectChanges();
  }

}

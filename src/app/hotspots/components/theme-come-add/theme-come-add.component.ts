import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { PluginHotspot } from '../../plugin-hotspot';

@Component({
  selector: 'app-theme-come-add',
  template: ''
})
export class ThemeComeAddComponent extends PluginHotspot {

  constructor(private viewContainerRef: ViewContainerRef, private factory: ComponentFactoryResolver, ) {
    super('theme_come_add');
  }

  addHotspot(component: any) {
    const compFactory = this.factory.resolveComponentFactory(component);
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(compFactory);
    componentRef.changeDetectorRef.detectChanges();
  }

}

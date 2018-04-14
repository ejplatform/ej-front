import { Component, ComponentFactoryResolver, ViewContainerRef, Input, ComponentRef } from '@angular/core';
import { PluginHotspot } from '../../plugin-hotspot';
import { Profile } from '../../../models/profile';

export interface ThemeMenuInterface {
  profile: Profile;
}

@Component({
  selector: 'app-theme-menu',
  template: ''
})
export class ThemeMenuComponent extends PluginHotspot {

  @Input() profile: Profile;

  constructor(private viewContainerRef: ViewContainerRef, private factory: ComponentFactoryResolver, ) {
    super('theme_menu');
  }

  addHotspot(component: any) {
    const compFactory = this.factory.resolveComponentFactory( component );
    this.viewContainerRef.clear();
    const componentRef = (this.viewContainerRef.createComponent(compFactory) as ComponentRef<ThemeMenuInterface>);
    componentRef.instance.profile = this.profile;
    componentRef.changeDetectorRef.detectChanges();

  }

}

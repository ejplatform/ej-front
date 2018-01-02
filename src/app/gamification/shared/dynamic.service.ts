import { ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector } from '@angular/core'

@Injectable()
export class DynamicService {
  rootViewContainer: any;
  id: any;
  
  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.id = Date.now();
    console.log('DynamicService: constructor', this.id)
    this.factoryResolver = factoryResolver
  }
  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }
  addDynamicComponent(componentObj: any) {
    const factory = this.factoryResolver.resolveComponentFactory(componentObj)
    const component = factory.create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)
  }
}
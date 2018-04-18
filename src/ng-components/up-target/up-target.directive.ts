import {Directive, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';


@Directive({
  selector: `[up-target=main][href]`
})
export class UpTargetDirective {
  @Input() href: string;

  constructor(private router: Router) {
  }

  @HostListener('click', ['$event'])
  routeFromLink(event: Event) {
    event.preventDefault();
    if (this.href) {
      this.router.navigate([this.href]);
    }
  }
}

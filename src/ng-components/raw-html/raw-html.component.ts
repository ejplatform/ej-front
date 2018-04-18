import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {RawHtmlLoaderService} from "./raw-html.service";
import {Router} from '@angular/router';

/**
 * Inject inner html into component using data either from a string of from a
 * remote endpoint.
 *
 * Examples:
 * - Using local data:
 *
 *    <raw-html htmlData="<h1>hello world!</h1>"></raw-html>
 *
 * - Using remote data:
 *
 *    <raw-html dataUrl="/some-data.html"></raw-html>
 *
 * If both properties are given, html-data (no remote data fetch) takes precedence.
 *
 * Angular sanitizes the HTML, but does not understand any Angular-specific syntax
 * or directives (e.g., routerLink="...") in the input HTML string. In order to
 * integrate better with other server generated markup, we can translate all links
 * with up-target=main into Angular router links. This behavior is only enabled
 * when the "upBind" attribute is set:
 *
 *    <raw-html htmlData={{someData}} upBind></raw-html>
 */
@Component({
  selector: 'raw-html',
  template: `<div [innerHTML]="htmlMarkup()"></div>`,
  providers: [RawHtmlLoaderService],
})
export class RawHtmlComponent implements OnInit, AfterViewChecked {
  @Input() htmlData: string;
  @Input() dataUrl: string;
  @Input() upBind: string;

  constructor(private sanitizer: DomSanitizer,
              private elementRef: ElementRef,
              private router: Router,
              private rawHtmlLoader: RawHtmlLoaderService,
              private render: Renderer2) {
  }

  ngOnInit() {
    if (!this.htmlData && this.dataUrl) {
      this.rawHtmlLoader.getData(this.dataUrl)
        .then(data => this.htmlData = data);
    }
  }

  ngAfterViewChecked() {
    if (this.upBind === "true" || this.upBind === "") {
      const router = this.router;
      const links = this.elementRef.nativeElement.querySelectorAll('[href][up-target=main]');
      const render = this.render;

      if (links.length) {
        links.forEach(link => {
          const href = link.getAttribute('href');

          render.listen(link, 'click', event => {
            event.preventDefault();
            if (href) {
              router.navigate([href]);
            }
          });
        });
      }
    }
  }

  htmlMarkup() {
    return this.sanitizer.bypassSecurityTrustHtml(this.htmlData);
  }
}

import { Component, OnInit, Input, HostListener, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { ProfileService } from '../../../src/app/services/profile.service';
import { LoginComponent } from '../../../src/app/login/login.component';
import { RegistrationComponent } from '../../../src/app/registration/registration.component';
import { AuthService } from '../../../src/app/services/auth.service';
import { GlobalState } from '../../../src/app/global.state';
import { CategoryService } from '../../../src/app/services/category.service';
import { Category } from '../../../src/app/models/category';
import { Profile } from '../../../src/app/models/profile';
import { Hotspot } from '../../../src/app/hotspots/hotspot.decorator';

@Component({
  selector: 'theme-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@Hotspot('theme_header')
export class HeaderComponent implements OnInit {

  isMenuCollapsed = false;
  bsModalRef: any;
  category: Category;
  @Input() profile: Profile;

  constructor(private _state: GlobalState, private profileService: ProfileService,
    private categoryService: CategoryService, private modalService: NgbModal,
    private router: Router, private authService: AuthService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.category = this.categoryService.getCurrent();

    this.categoryService.categoryChangeEvent.subscribe((category: Category) => {
      this.category = category;
    });

    this.profile = this.profileService.getProfile();

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });

  }

  ngOnInit() {
  }

  getStyles() {
    return this.category ? this.category.getStyle() : null;
  }

  toggleMenu(keepOpen = false) {
    if (keepOpen && window.innerWidth > 640) {
      return false;
    }

    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  isLogged() {
    return _.isObject(this.profile) && this.profile.id;
  }

  openLogin() {
    this.bsModalRef = this.modalService.open(LoginComponent);
    this.bsModalRef.componentInstance.loggedIn.subscribe(() => {
      this.profile = this.profileService.getProfile();
      this.profileService.profileChangeEvent.emit(this.profile);
      window.location.reload();
    });
  }

  openRegistration() {
    this.bsModalRef = this.modalService.open(RegistrationComponent);
    this.bsModalRef.componentInstance.loggedIn.subscribe(() => {
      this.profile = this.profileService.getProfile();
      this.profileService.profileChangeEvent.emit(this.profile);
      window.location.reload();
    });
  }
}

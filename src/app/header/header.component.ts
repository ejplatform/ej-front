import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as _ from 'lodash';


import { ProfileService } from '../services/profile.service';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/profile';
import { GlobalState } from '../global.state';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
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
    return _.isObject(this.profile);
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

  @HostListener('window:message', ['$event'])
  getPolisMessage(event) {
    if (event.data === 'askForLogin') {
      this.openLogin();
      // FIXME refactor this like there is no tomorrow!!!
      this.bsModalRef.componentInstance.loggedIn.subscribe(() => {
        // FIXME see if it's necessary
        window.location.reload();
      });
    }
  }
}

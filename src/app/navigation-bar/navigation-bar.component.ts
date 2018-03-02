import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';

import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { GlobalState } from '../global.state';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  static MAX_SIZE_FOR_AUTOMATIC_TOGGLE = 640;

  @Input() profile: Profile;
  isMenuCollapsed = false;

  category: Category;

  constructor(private _state: GlobalState, private profileService: ProfileService, private categoryService: CategoryService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });


    this.category = this.categoryService.getCurrent();

    this.categoryService.categoryChangeEvent.subscribe((category: Category) => {
      this.category = category;
    });

  }

  getStyles() {
    return this.category ? this.category.getStyle() : null;
  }

  ngOnInit() { }

  toggleMenu() {
    if (window.innerWidth > NavigationBarComponent.MAX_SIZE_FOR_AUTOMATIC_TOGGLE) {
      return false;
    }


    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

}

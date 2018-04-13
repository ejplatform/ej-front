import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';

import { Profile } from '../../../src/app/models/profile';
import { ProfileService } from '../../../src/app/services/profile.service';
import { GlobalState } from '../../../src/app/global.state';
import { Category } from '../../../src/app/models/category';
import { CategoryService } from '../../../src/app/services/category.service';

import { ThemeMenuInterface } from '../../../src/app/theme-menu/theme-menu.component';
import { Hotspot } from '../../../src/app/hotspot/hotspot.decorator';


@Component({
  selector: 'theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss'],
})
@Hotspot('theme_menu')
export class ThemeMenuComponent implements OnInit, ThemeMenuInterface {

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
    if (window.innerWidth > ThemeMenuComponent.MAX_SIZE_FOR_AUTOMATIC_TOGGLE) {
      return false;
    }


    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

}

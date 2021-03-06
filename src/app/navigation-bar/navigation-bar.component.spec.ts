import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import * as helpers from '../../spec/helpers';
import { NavigationBarComponent } from './navigation-bar.component';
import { ProfileService } from '../services/profile.service';
import { GlobalState } from '../global.state';
import { Profile } from '../models/profile';
import { CategoryService } from '../services/category.service';

describe('NavigationBarComponent', () => {

  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  const mocks = helpers.getMocks();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: GlobalState, useValue: mocks.globalState },
        { provide: CategoryService, useValue: mocks.categoryService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    component.profile = <Profile>{ id: 1 };
    fixture.detectChanges();
  });

  it('display link to comments', () => {
    expect(fixture.debugElement.query(By.css('.comments')).nativeElement.href).toContain('comments');
  });

  it('display link to profile', () => {
    expect(fixture.debugElement.query(By.css('.profile')).nativeElement.href).toContain('profile');
  });

});

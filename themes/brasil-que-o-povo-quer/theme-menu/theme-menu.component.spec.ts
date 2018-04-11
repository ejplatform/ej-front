import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import * as helpers from '../../../src/spec/helpers';
import { ThemeMenuComponent } from './theme-menu.component';
import { ProfileService } from '../../../src/app/services/profile.service';
import { GlobalState } from '../../../src/app/global.state';
import { Profile } from '../../../src/app/models/profile';
import { CategoryService } from '../../../src/app/services/category.service';

describe('ThemeMenuComponent', () => {

  let component: ThemeMenuComponent;
  let fixture: ComponentFixture<ThemeMenuComponent>;
  const mocks = helpers.getMocks();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeMenuComponent],
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
    fixture = TestBed.createComponent(ThemeMenuComponent);
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

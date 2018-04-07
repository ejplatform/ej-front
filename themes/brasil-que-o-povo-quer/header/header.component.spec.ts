import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../src/app/services/auth.service';


import { HeaderComponent } from './header.component';
import * as helpers from '../../../src/spec/helpers';
import { ProfileService } from '../../../src/app/services/profile.service';
import { GlobalState } from '../../../src/app/global.state';
import { CategoryService } from '../../../src/app/services/category.service';

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const mocks = helpers.getMocks();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot(), NgbModule.forRoot(), NgPipesModule],
      providers: [{ provide: CategoryService, useValue: mocks.categoryService },
      { provide: GlobalState, useValue: mocks.globalState },
      { provide: AuthService, useValue: mocks.authService },
      { provide: ProfileService, useValue: mocks.profileService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('display site-header', () => {
    expect(fixture.debugElement.queryAll(By.css('.site-header')).length).toBe(1);
  });

});

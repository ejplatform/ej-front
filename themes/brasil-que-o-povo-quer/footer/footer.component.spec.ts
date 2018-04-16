import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


import { FooterComponent } from './footer.component';
import * as helpers from '../../../src/spec/helpers';
import { GlobalState } from '../../../src/app/global.state';
import { CategoryService } from '../../../src/app/services/category.service';

describe('FooterComponent', () => {

  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [{ provide: CategoryService, useValue: mocks.categoryService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('display component', () => {
    expect(fixture.debugElement.queryAll(By.css('.sponsors')).length).toBe(1);
  });

});

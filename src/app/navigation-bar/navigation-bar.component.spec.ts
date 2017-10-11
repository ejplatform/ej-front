import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RestangularModule } from 'ngx-restangular';


import { NavigationBarComponent } from './navigation-bar.component';
import * as helpers from "../../spec/helpers";


describe('NavigationBarComponent', () => {

  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let mocks = helpers.getMocks();
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBarComponent ],
      imports: [RouterTestingModule, RestangularModule, TranslateModule.forRoot()],
      
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

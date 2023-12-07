/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocaionComponent } from './locaion.component';

describe('LocaionComponent', () => {
  let component: LocaionComponent;
  let fixture: ComponentFixture<LocaionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

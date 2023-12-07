/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NonecashbenifitComponent } from './nonecashbenifit.component';

describe('NonecashbenifitComponent', () => {
  let component: NonecashbenifitComponent;
  let fixture: ComponentFixture<NonecashbenifitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonecashbenifitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonecashbenifitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

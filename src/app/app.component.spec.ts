// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

class RouterMock {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    })
    .overrideComponent(
      AppComponent,
      {set: {providers: [
        {provide: Router, useClass: RouterMock },
      ]}
    })
    .compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'calcgems'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('calcgems');
  });

});


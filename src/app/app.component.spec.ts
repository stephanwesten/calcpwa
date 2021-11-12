// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { MatToolbar } from '@angular/material/toolbar';
import { ShareFormComponent } from './share-form/share-form.component'

import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

let loader: HarnessLoader;

class RouterMock {}

class MatDialogMock {
  public url = "https://calcshare"
}


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, MatToolbar, ShareFormComponent
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    })
    .overrideComponent(
      AppComponent,
      {set: {providers: [
        {provide: Router, useClass: RouterMock },
        {provide: MatDialog, useClass: MatDialogMock },
      ]}
    })
    .compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'calcgems'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('calcgems');
  // });

});


// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatInkBar, MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { AppComponent } from './app.component';

// stubs
@Component({selector: 'app-sheet', template: ''})
class SheetComponent{}

@Component({selector: 'app-calculator', template: ''})
class CalculatorComponent{}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MatTab,
        MatTabGroup,
        MatTabHeader,
        MatInkBar,
        SheetComponent,
        CalculatorComponent
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'calc-pwa'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('calc-pwa');
  });

});


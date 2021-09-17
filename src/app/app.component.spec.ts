import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
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

  it('basic plus operator and times', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.clickDigit(2);
    app.clickOperator("+");
    app.clickDigit(4);
    app.clickEqual();
    expect(app.expression.asString()).toEqual(" 2 + 4");
    expect(app.terminal).toEqual("6");
    app.clickOperator("*");
    app.clickDigit(3);
    app.clickEqual();
    expect(app.terminal).toEqual("18");
  });

  it('thousand separator', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.clickDigit(2);
    app.clickDigit(0);
    app.clickDigit(0);
    app.clickDigit(0);
    app.clickOperator("*");
    app.clickDigit(2);
    app.clickEqual();
    expect(app.expression.asString()).toEqual(" 2000 * 2");
    expect(app.terminal).toEqual("4000");
  });

});


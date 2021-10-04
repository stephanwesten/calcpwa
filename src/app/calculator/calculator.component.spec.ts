// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent, MatGridList, MatGridTile ],
      // schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('basic plus operator and times', () => {
    component.clickDigit(2);
    component.clickOperator("+");
    component.clickDigit(4);
    component.clickEqual();
    expect(component.expression.asString()).toEqual("2 + 4 = 6");
    expect(component.terminal).toEqual("6");
    component.clickOperator("*");
    component.clickDigit(3);
    component.clickEqual();
    expect(component.terminal).toEqual("18");
  })

  it('thousand separator', () => {
    component.clickDigit(2);
    component.clickDigit(0);
    component.clickDigit(0);
    component.clickDigit(0);
    component.clickOperator("*");
    component.clickDigit(2);
    component.clickEqual();
    expect(component.expression.asString()).toEqual("2000 * 2 = 4000");
    expect(component.terminal).toEqual("4000");
  })

  it('override operator', () => {
    component.clickDigit(2);
    component.clickOperator("*");
    component.clickOperator("+");
    component.clickDigit(5);
    component.clickEqual();
    expect(component.expression.asString()).toEqual("2 + 5 = 7");
    expect(component.terminal).toEqual("7");

  })

  it('delete char', () => {
    component.clickDigit(2);
    component.clickDelete()
    expect(component.terminal).toEqual("")

    component.clickDigit(2);
    component.clickOperator("+")
    component.clickDelete()
    expect(component.terminal).toEqual("")
  })
  

});

// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { SheetComponent } from './sheet.component';
import { CalcService } from '../calc.service';
import { Sheet } from '../model/sheet';
import { convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

class CalcServiceMock {
  getCurrentSheet() : Sheet {
    return new Sheet
  }
}

class RouterMock {
  public url = "https://calcshare"
}

export class ActivatedRouteMock {
  // no meaningful impl, just get the test passing
  public paramMap = of(convertToParamMap({ 
      testId: 'abc123',
      anotherId: 'abc456',          
  }));
}

describe('SheetComponent', () => {
  let component: SheetComponent;
  let fixture: ComponentFixture<SheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetComponent, MatGridList, MatGridTile ],
      // schemas: [NO_ERRORS_SCHEMA],
    })
    .overrideComponent(
      SheetComponent,
      {set: {providers: [
        {provide: CalcService, useClass: CalcServiceMock },
        {provide: Router, useClass: RouterMock },
        {provide: ActivatedRoute, useClass: ActivatedRouteMock}
      ]}
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

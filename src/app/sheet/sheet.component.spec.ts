// import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { SheetComponent } from './sheet.component';
import { CalcService } from '../calc.service';
import { Sheet } from '../model/sheet';

class CalcServiceMock{
  getCurrentSheet() : Sheet {
    return new Sheet
  }
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
      {set: {providers: [{provide: CalcService, useClass: CalcServiceMock }]}
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

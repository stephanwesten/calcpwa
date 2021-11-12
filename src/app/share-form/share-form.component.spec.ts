import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CalcService } from '../calc.service';

import { Sheet } from '../model/sheet';
import { ShareFormComponent } from './share-form.component';



class CalcServiceMock {
  getCurrentSheet() : Sheet {
    return new Sheet
  }
}

class RouterMock {
  public url = "https://calcshare"
}

class ActivatedRouteMock {
  // no meaningful impl, just get the test passing
  public paramMap = of(convertToParamMap({ 
      testId: 'abc123',
      anotherId: 'abc456',          
  }));
}


describe('ShareFormComponent', () => {
  let component: ShareFormComponent;
  let fixture: ComponentFixture<ShareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareFormComponent ]
    })
    .overrideComponent(
      ShareFormComponent,
      {set: {providers: [
        {provide: CalcService, useClass: CalcServiceMock },
        {provide: Router, useClass: RouterMock },
        {provide: ActivatedRoute, useClass: ActivatedRouteMock}
      ]}
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    // TODO use class CalcServiceMock {
    //   getCurrentSheet() : Sheet {
    //     return new Sheet
    //   }
    // }

    expect(component).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { Sheet } from './model/sheet';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  readonly currentSheet: Sheet = new Sheet;

  constructor() { }


}

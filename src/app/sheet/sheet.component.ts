import { Component, OnInit } from '@angular/core';
import { CalcService } from '../calc.service';
import { Expression } from '../model/expression';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  constructor(private calcService: CalcService) { }

  ngOnInit(): void {
  }

  getExpressions(): Array<Expression> {
    return this.calcService.currentSheet.items
  }

}

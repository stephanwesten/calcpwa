import { Component, OnInit } from '@angular/core';
import { CalcService } from '../calc.service';
import { Expression } from '../model/expression';
import { Sheet } from '../model/sheet';

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
    return this.calcService.getCurrentSheet().items
  }

  clickRetrieve() {    
    this.calcService.getFromKVStore()
    var foo = JSON.stringify(this.calcService.getCurrentSheet())
    window.alert("retrieved: " + foo)
  }

  clickShare() {
    if (this.calcService.getCurrentSheet().size() > 0) {
      this.calcService.setToKVStore()
      window.alert("shared")  
    } else {
      window.alert("nothing to share")
    }
  }

}

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CalcService } from '../calc.service';
import { Expression } from '../model/expression';

@Component({
  selector: 'sheets',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {
  dataSource = this.getExpressions()
  displayedColumns: string[] = [ 'name', 'expression', 'outcome'];

  constructor(private calcService: CalcService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // proprietary router to check whether user clicked Share in toolbar, should be replaced by something from Angular
      console.log("** url: " , this.route.snapshot.url )
      // determine whether we need to load a sheet from CF       
      // it is a bit odd that we subscribe to params, but dont use it
      // maybe this needs to be improved, or this is fine because we only use this for initial load 
      const urlParam = this.route.snapshot.queryParams["sheetId"]
      if (urlParam && urlParam.length > 0) {
        const sheetIdFromRoute = String(urlParam)
        console.log("retrieve sheet with uid: ", sheetIdFromRoute)
        this.calcService.getFromKVStore(sheetIdFromRoute)  
      } else {
        console.log("empty sheetId: ", params)
      }
    })

  }

  getExpressions(): Array<Expression> {
    return this.calcService.getCurrentSheet().items
  }

  editExpressionName(expression: Expression) {
    window.alert("Todo edit: " + expression.name)
  }

}

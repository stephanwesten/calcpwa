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

  constructor(private calcService: CalcService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const urlParam = params.get("sheetId")
      if (urlParam && urlParam.length > 0) {
        const sheetIdFromRoute = String(urlParam)
        console.log("retrieve sheet with uid: ", sheetIdFromRoute)
        this.calcService.getFromKVStore(sheetIdFromRoute)  
      } else {
        console.log("empty sheetId: ", this.route.snapshot)
      }
    })


    //   // First get the sheet id from the current route.
    // const routeParams = this.route.snapshot.paramMap;
    // const urlParam = routeParams.get('sheetId')
    // if (urlParam && urlParam.length > 0) {
    //   const sheetIdFromRoute = String(urlParam)
    //   console.log("retrieve sheet with uid: ", sheetIdFromRoute)
    //   this.calcService.getFromKVStore(sheetIdFromRoute)  
    // } else {
    //   console.log("empty sheetId: ", this.route.snapshot)
    // }
  }

  getExpressions(): Array<Expression> {
    return this.calcService.getCurrentSheet().items
  }

}

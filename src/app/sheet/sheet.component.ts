import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CalcService } from '../calc.service';
import { Expression } from '../model/expression';
import { Sheet } from '../model/sheet';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  constructor(private calcService: CalcService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
      // First get the sheet id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const urlParam = routeParams.get('sheetId')
    // this if should not be needed, angular should not route
    if (urlParam && urlParam.length > 0) {
      const sheetIdFromRoute = String(urlParam)
      console.log("retrieve sheet with uid: ", sheetIdFromRoute)
      this.calcService.getFromKVStore(sheetIdFromRoute)  
    } else {
      console.log("empty sheetId: ", this.route.snapshot)
    }
  }

  getExpressions(): Array<Expression> {
    return this.calcService.getCurrentSheet().items
  }

  clickRetrieve() {    
    this.calcService.getFromKVStore("todo")
    let foo = JSON.stringify(this.calcService.getCurrentSheet())
    window.alert("retrieved: " + foo)
  }

  clickShare() {
    const url = this.router.url
    if (this.calcService.getCurrentSheet().size() > 0) {
      this.calcService.setToKVStore().subscribe({
        next(response) {
          console.log('link: ', response)
          window.alert("Link that can be shared:" + url + response.uid)  
        },
        error(msg) {
          console.log('Error: ', msg);
          window.alert("Something went wrong, error: " + msg)  
        }
      });
    } else {
      window.alert("Nothing to share, please add some interesting calculations")
    }
  }

}

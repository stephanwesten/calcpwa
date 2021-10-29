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
      // proprietary router, should be replaced by something from Angular
      console.log("** url: " , this.route.snapshot.url )
      if (this.route.snapshot.url[0].path == "share") {
        this.share()
      } else {
        const urlParam = params.get("sheetId")
        if (urlParam && urlParam.length > 0) {
          const sheetIdFromRoute = String(urlParam)
          console.log("retrieve sheet with uid: ", sheetIdFromRoute)
          this.calcService.getFromKVStore(sheetIdFromRoute)  
        } else {
          console.log("empty sheetId: ", this.route.snapshot)
        }
      }
    })

    // alternative way"
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

  // clickRetrieve() {    
  //   this.calcService.getFromKVStore("todo")
  //   let foo = JSON.stringify(this.calcService.getCurrentSheet())
  //   window.alert("retrieved: " + foo)
  // }

  share() {
    const rtr = this.router
    if (this.calcService.getCurrentSheet().size() > 0) {
      this.calcService.setToKVStore().subscribe({
        next(response) {
          console.log('response worker: ', response)
          const baseURL = rtr['location']._platformLocation.location.origin
          //TODO instead of using 'sheets', consider using 'share' as segment
          // this way we know it is an external sheet, not a local one
          const path = rtr.createUrlTree(["sheets", response.uid])
          window.alert("Link that can be shared: " + baseURL + path)  
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

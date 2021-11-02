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

  constructor(private calcService: CalcService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // proprietary router to check whether user clicked Share in toolbar, should be replaced by something from Angular
      console.log("** url: " , this.route.snapshot.url )
      if (this.route.snapshot.url[0].path == "share") {
        this.share()
      } else {
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

  editExpressionName(expression: Expression) {
    window.alert("Todo edit: " + expression.name)
  }

  share() {
    const rtr = this.router
    if (this.calcService.getCurrentSheet().size() > 0) {
      this.calcService.setToKVStore().subscribe({
        next(response) {
          console.log('response worker: ', response)
          const baseURL = rtr['location']._platformLocation.location.origin
          // this url will make the pwa navigate to the right place after being loaded from CF
          // (because in the worker we detect the 'sheets' prefix, load the pwa, and the pwa will navigate to the right place)
          let params = new HttpParams();
          params = params.append("sheetId", response.uid)
          const url = baseURL + "/sheets?" + params.toString();
          window.alert("Link that can be shared: " + url)  
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

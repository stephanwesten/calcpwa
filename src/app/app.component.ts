import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuildTimeFile } from "../environments/buildtime-file";
import { CalcService } from './calc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'calcgems';
  readonly buildtimestamp = BuildTimeFile.buildtime

  constructor(private router: Router, private calcService: CalcService) {
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


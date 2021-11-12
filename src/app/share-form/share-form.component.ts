import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { CalcService } from '../calc.service';

@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: ['./share-form.component.scss']
})
export class ShareFormComponent implements OnInit {
  shareForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    description: new FormControl(''),
    link: new FormControl({ value: '', disabled: true }),
  });

  constructor(private router: Router, private calcService: CalcService) { }

  ngOnInit(): void {
  }

  share() {
    //TOO: copy from form controls the name and description to the sheet
    const rtr = this.router
    const linkControl = this.shareForm.controls["link"]    
    // save the sheet in cf kv store
    this.calcService.setToKVStore().subscribe({
      // cf worker returns a response with the id of the sheet
      next(response) {
        console.log('response worker: ', response)
        // determine the domain e.g. calcpwa.saw.cloudflare.worker
        const baseURL = rtr['location']._platformLocation.location.origin
        let params = new HttpParams();
        params = params.append("sheetId", response.uid)
        const url = baseURL + "/sheets?" + params.toString();
        // when the user uses the url, it will make the pwa navigate to the right place after being loaded from CF
        // (because in the worker we detect the 'sheets' prefix, load the pwa, and the pwa will navigate to the right place)
        linkControl.setValue(url)
      },
      error(msg) {
        console.log('Error: ', msg);
        window.alert("Something went wrong, error: " + msg)  
      }
    });
  }
}



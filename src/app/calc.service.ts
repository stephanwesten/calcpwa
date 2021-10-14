import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Sheet } from './model/sheet';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  private currentSheet: Sheet = new Sheet;

  constructor(private http: HttpClient) { }

  readonly kvUrl = 'cf/kv';

  getCurrentSheet() : Sheet {
    return this.currentSheet
  }

  getFromKVStore() {
    this.http.get<Sheet>(this.kvUrl).subscribe(
      data => {
        var sheet: Sheet
        sheet = data 
        console.log('get from kv succeeded, data: ', data)
        Object.assign(this.currentSheet, sheet)
        console.log('get from kv succeeded, sheet: ', this.currentSheet)
      },
      error => console.log('get from kv failed, error: ', error)
    )
  }

  setToKVStore() {
    console.log('about to store in kv, sheet: ', this.currentSheet)
    this.http.put(this.kvUrl, this.currentSheet).subscribe(
      data => console.log('set from kv ok, data: ', data),
      error => console.log('set from kv failed, error: ', error)
    )
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Sheet } from './model/sheet';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { deserialize, serialize } from 'typescript-json-serializer';


interface CFSetResponse {
  uid : string    
}

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

  getFromKVStore(uid: string) {
    const url = this.kvUrl + "/sheet/" + uid
    console.log('retrieve from ', url)
    this.http.get<Sheet>(url).subscribe(
      data => {
        this.currentSheet = deserialize<Sheet>(data, Sheet)
        console.log('get from kv succeeded, sheet: ', this.currentSheet)
      },
      error => console.log('get from kv failed, error: ', error)
    )
  }

  setToKVStore(): Observable<CFSetResponse> {
    console.log('about to store in kv, sheet: ', this.currentSheet)
    var json = serialize(this.currentSheet);
    return this.http.put<CFSetResponse>(this.kvUrl, json).pipe(
      map(data => data), catchError(this.handleError))
  }
  

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpErrorResponse } from '@angular/common/http';


import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class BankHttpService {

  private baseUrl = "https://vast-shore-74260.herokuapp.com/banks?city=";

  myCity: string = 'BANGALORE';

  constructor(private _http : HttpClient) {
    console.log('Bank http service created');
  }

  private handleError(err:HttpErrorResponse){
    console.log('Handle http error');
    console.log(err.message);
    return Observable.throw(err.message);
  }  


  // Api Call
  public getBankBranches(myCity: string): any {
    console.log('calling')
    console.log(myCity);
    let myResponse = this._http.get(this.baseUrl +  myCity);
    return myResponse;
  }
}
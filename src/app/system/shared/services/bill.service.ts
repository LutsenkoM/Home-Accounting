import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {Bill} from "../models/bill.model";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) {
  }

  public getBill(): Observable<Bill> {
    return this.http.get('http://localhost:3000/bill')
      .pipe(
        map((response: any) => response)
      );
  }

  getCurrency(base: string = 'UAH'): Observable<any> {
    return this.http.get(`http://api.fixer.io/latest?base=${base}`)
      .pipe(
        map((response: any) => response)
      );;
  }
}

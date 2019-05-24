import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {Bill} from "../models/bill.model";
import {BaseApi} from "../../../shared/core/base-api";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseApi{

  constructor(public http: HttpClient) {
    super(http);
  }

  // public getBill(): Observable<Bill> {
  //   return this.http.get('http://localhost:3000/bill')
  //     .pipe(
  //       map((response: any) => response)
  //     );
  // }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrency(): Observable<any>{
    return this.http.get(`http://data.fixer.io/api/latest?access_key=45f8082378e136bf8445a201e32297e8`)
        .pipe(
          map((response: any) => response)
        );
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

}

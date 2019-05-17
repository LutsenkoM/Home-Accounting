import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {Observable, Subscription} from "rxjs/Rx";
import {Bill} from "../shared/models/bill.model";

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  subscriptionCurrency: Subscription;
  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.billService.getBill(), this.billService.getCurrency()
    ).subscribe((data: [Bill, any])=> {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });

  }

  onRefresh() {
    this.isLoaded = false;
      this.subscriptionCurrency =  this.billService.getCurrency()
        .delay(500)
        .subscribe((currency: any)=>{
          console.log(currency);
          this.currency = currency;
          this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionCurrency.unsubscribe();
  }

}

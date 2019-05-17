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

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.billService.getBill()
      // ,
      // this.billService.getCurrency()
    ).subscribe((data: [Bill, any])=> {
      console.log(data);
    })

      this.billService.getCurrency()
        .subscribe((response)=>{
      console.log(response)
    });
  }

  onRefresh() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

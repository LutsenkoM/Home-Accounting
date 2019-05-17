import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;
  currencyDate: string;
  courseUsd: number;
  courseEur: number;
  courseUah: number;


  constructor() { }

  ngOnInit() {
    this.currencyDate = this.currency.date;
    this.courseUsd = this.currency.rates.USD;
    this.courseEur = this.currency.rates.EUR;
    this.courseUah = this.currency.rates.UAH;
  }

}

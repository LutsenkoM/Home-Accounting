import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;

  rates: object;

  currencies: string[] = ['USD', 'EUR', 'UAH'];

  constructor() { }

  ngOnInit() {

    this.rates = this.currency.rates;

  }

}

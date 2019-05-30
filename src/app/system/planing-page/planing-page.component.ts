import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {Observable, Subscription} from "rxjs";
import {Category} from "../shared/models/category.model";
import {APPEvent} from "../shared/models/event.model";
import {Bill} from "../shared/models/bill.model";

@Component({
  selector: 'app-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1: Subscription;

  bill: Bill;
  categories: Category[] = [];
  events: APPEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
        this.billService.getBill(),
        this.categoriesService.getCategories(),
        this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], APPEvent[]])=> {
      this.bill = data[0];
      this.categories = data [1];
      this.events = data[2];

      console.log(this.categories);

      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercente(cat: Category): number {
     const percent = (100 * this.getCategoryCost(cat) / cat.capacity);
     return percent > 100 ? 100 : percent;
  }

  getCatProgress(cat: Category): string {
    return  this.getPercente(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercente(cat);
    return percent < 60? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }

  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {Observable, Subscription} from "rxjs";
import {Category} from "../shared/models/category.model";
import {APPEvent} from "../shared/models/event.model";
import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService, private eventService: EventsService) { }

  categorise: Category[] = [];
  events: APPEvent[] = [];
  filteredEvents: APPEvent[] = [];
  isLoaded = false;
  chartData = [];
  s1: Subscription;
  isFilterVisible: boolean = false;

  ngOnInit() {
    this.s1 = Observable.combineLatest(
        this.categoriesService.getCategories(),
        this.eventService.getEvents()
    ).subscribe((data: [Category[], APPEvent[]]) => {
      this.categorise = data[0];
      this.events = data[1];
      this.isLoaded = true;

      this.setOriginalEvents();
      this.calculateChartData();
    })
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categorise.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })

    })
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
        .filter((e) => {
          return filterData.types.indexOf(e.type) !== -1;
        })
        // .filter((e) => {
        //   // return filterData.categorise.indexOf(e.category.toString()) !== -1;
        //   return 'income';
        // })
        .filter( (e) => {
          const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
          return momentDate.isBetween(startPeriod, endPeriod);
        });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CategoriesService} from "../../shared/services/categories.service";
import {EventsService} from "../../shared/services/events.service";
import {APPEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: APPEvent;
  category: Category;

  isLoaded: false;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private eventService: EventsService) { }

  ngOnInit() {
    this.s1 = this.route.params
        .mergeMap((params: Params) =>
          this.eventService.getEventBtId(params['id'])
        )
        .mergeMap((event: APPEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event.category);
        })
        .subscribe((category: Category) => {
          this.category = category;
          this.isLoaded = false;
        })
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}

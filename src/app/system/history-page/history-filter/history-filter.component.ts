import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    {type: 'd', label: 'Day'},
    {type: 'w', label: 'Week'},
    {type: 'M', label: 'Month'},
  ];

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  constructor() { }

  ngOnInit() {
  }

  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';

    this.onFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string ) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  handleChangeType(event) {
    this.calculateInputParams('selectedTypes', event.checked, event.value);
  }

  handleChangeCategory(event) {
    this.calculateInputParams('selectedCategories', event.checked, event.value);
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    })
  }

}

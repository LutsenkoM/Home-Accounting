import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Message} from "../../../shared/models/message.model";
import {text} from "@angular/core/src/render3/instructions";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Category has been edited';
        window.setTimeout(() => this.message.text = '', 5000);
      })
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId)
  }

}

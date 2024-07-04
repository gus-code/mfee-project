import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Category } from '../../models/Category';

@Component({
  selector: 'mfee-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() selectedCategory: string;
  @Input() categories: Array<Category>;
  @Output() categoryChange: EventEmitter<string> = new EventEmitter<string>();

  setCategory(categoryId: string) {
    this.categoryChange.emit(categoryId)
  }
}

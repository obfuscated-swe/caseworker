import { Component } from '@angular/core';
import { SearchComponent } from '../../../components/common/search/search.component';

@Component({
  selector: 'task-filters',
  imports: [SearchComponent],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.css',
})
export class TaskFiltersComponent {}

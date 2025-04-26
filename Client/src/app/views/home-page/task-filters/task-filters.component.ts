import { Component, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from '../../../components/common/search/search.component';
import { StatusSelectorComponent } from '../../../components/common/status-selector/status-selector.component';
import { FormsModule, NgForm } from '@angular/forms';
import { StatusList, TaskStatus } from '../../../types/task';
import { Filter } from '../../../types/filter';

@Component({
  selector: 'task-filters',
  imports: [SearchComponent, StatusSelectorComponent, FormsModule],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.css',
})
export class TaskFiltersComponent {
  @Output() newFilter: EventEmitter<Filter> = new EventEmitter<Filter>();

  selectedStatus: TaskStatus[] = StatusList();

  submitFilter(form: NgForm) {
    console.log(form.value);

    const filter: Filter = {
      order: form.value.order || 'closest',
      search: form.value.search,
      statuses: this.selectedStatus,
    };

    this.newFilter.emit(filter);
  }

  emptyFilter(): Filter {
    return {
      order: 'closest',
      search: '',
      statuses: [],
    };
  }
}

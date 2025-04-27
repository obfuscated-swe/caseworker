import { Component, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from '../../../components/common/search/search.component';
import { StatusSelectorComponent } from '../../../components/common/status-selector/status-selector.component';
import { FormsModule, NgForm } from '@angular/forms';
import { StatusList, TaskStatus } from '../../../types/task';
import { Filter, SearchObject } from '../../../types/filter';

@Component({
  selector: 'task-filters',
  imports: [SearchComponent, StatusSelectorComponent, FormsModule],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.css',
})
export class TaskFiltersComponent {
  @Output() newFilter: EventEmitter<Filter> = new EventEmitter<Filter>();

  public selectedStatus: TaskStatus[] = StatusList();
  public searchValue: SearchObject = { type: 'id', value: '' };
  public orderValue: string = 'ascending';

  submitFilter(form: NgForm) {
    const filter: Filter = {
      order: form.value.order || 'ascending',
      search: {
        type: form.value.search.type,
        value: form.value.search.value,
      },
      statuses: this.selectedStatus,
    };

    console.log(filter);
    this.newFilter.emit(filter);
  }
}

import { Component } from '@angular/core';
import { SearchComponent } from '../../../components/common/search/search.component';
import { StatusSelectorComponent } from '../../../components/common/status-selector/status-selector.component';
import { FormsModule, NgForm } from '@angular/forms';
import { StatusList, TaskStatus } from '../../../types/task';

@Component({
  selector: 'task-filters',
  imports: [SearchComponent, StatusSelectorComponent, FormsModule],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.css',
})
export class TaskFiltersComponent {
  selectedStatus: TaskStatus[] = StatusList();

  submitFilter(form: NgForm) {
    console.log(form.value);
  }
}

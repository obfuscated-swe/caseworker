import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFiltersComponent } from './task-filters/task-filters.component';
import { PaginationComponent } from '../../components/common/pagination/pagination.component';
import { Filter } from '../../types/filter';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TaskListComponent, TaskFiltersComponent],
  providers: [TaskService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  public title = 'Home Page';
  public filter: Filter = {} as Filter;

  filterChanged($event: Filter) {
    this.filter = $event;
  }

  redirectToNew() {
    window.location.href = '/new-task';
  }
}

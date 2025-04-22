import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFiltersComponent } from './task-filters/task-filters.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TaskListComponent, TaskFiltersComponent],
  providers: [TaskService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  title = 'Home Page';

  redirectToNew() {
    window.location.href = '/new-task';
  }
}

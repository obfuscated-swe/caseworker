import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../types/task';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { NoConnectionComponent } from '../../components/error/no-connection/no-connection.component';
import { SearchComponent } from '../../components/common/search/search.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from '../../components/common/task/task.component';
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
}

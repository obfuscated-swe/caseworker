import { Component, inject } from '@angular/core';
import { NoConnectionComponent } from '../../../components/error/no-connection/no-connection.component';
import { Task } from '../../../types/task';
import { Page } from '../../../types/page';
import { TaskService } from '../../../services/task.service';
import { TaskComponent } from '../../../components/common/task/task.component';
import { GenericErrorComponent } from '../../../components/error/generic-error/generic-error.component';
import { EmptyFilterComponent } from '../../../components/error/empty-filter/empty-filter.component';
import { PaginationComponent } from '../../../components/common/pagination/pagination.component';

@Component({
  selector: 'task-list',
  imports: [
    NoConnectionComponent,
    TaskComponent,
    GenericErrorComponent,
    EmptyFilterComponent,
    PaginationComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  public error: boolean = false;
  public loading: boolean = true;
  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];

  public currentPage: number = 1;
  public totalPages: number = 1;

  private page: number = 0;
  private size: number = 5;

  private taskService = inject(TaskService);

  ngOnInit(): void {
    this.getAllTasks(this.page, this.size);
  }

  getAllTasks(page: number, size: number): void {
    this.taskService.getAllTasks(page, size).subscribe({
      next: (res: Page<Task>) => {
        console.log(res);
        this.loading = false;

        this.tasks = res.content;
        this.filteredTasks = res.content;

        this.currentPage = res.page.number + 1;
        this.totalPages = res.page.totalPages;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.error = true;
      },
    });
  }

  pageChanged(page: number): void {
    this.getAllTasks(page - 1, this.size);
  }
}

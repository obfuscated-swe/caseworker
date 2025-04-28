import { Component, inject, Input } from '@angular/core';
import { NoConnectionComponent } from '../../../components/error/no-connection/no-connection.component';
import { Task } from '../../../types/task';
import { Page } from '../../../types/page';
import { Filter } from '../../../types/filter';
import { TaskService } from '../../../services/task.service';
import { TaskComponent } from '../../../components/common/task/task.component';
import { GenericErrorComponent } from '../../../components/error/generic-error/generic-error.component';
import { EmptyFilterComponent } from '../../../components/error/empty-filter/empty-filter.component';
import { PaginationComponent } from '../../../components/common/pagination/pagination.component';

@Component({
  selector: 'task-list',
  imports: [NoConnectionComponent, TaskComponent, GenericErrorComponent, PaginationComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @Input() public filter: Filter = {} as Filter;

  public error: boolean = false;
  public loading: boolean = true;
  public tasks: Task[] = [];
  public currentPage: number = 1;
  public totalPages: number = 1;

  private page: number = 0;
  private size: number = 5;

  private taskService = inject(TaskService);

  ngOnChanges(): void {
    this.getTasks(this.page, this.size, this.filter);
  }

  getTasks(page: number, size: number, filter: Filter = {} as Filter): void {
    if (filter.search && filter.search.type === 'id' && filter.search.value) {
      this.taskService.getTask(parseInt(filter.search.value)).subscribe({
        next: (res: Task) => {
          console.log(res);
          this.loading = false;
          this.tasks = [res];
          this.currentPage = 1;
          this.totalPages = 1;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.error = true;
          this.tasks = [];
        },
      });
      return;
    }

    this.taskService.getAllTasks(page, size, filter).subscribe({
      next: (res: Page<Task>) => {
        console.log(res);
        this.loading = false;

        this.tasks = res.content;

        this.currentPage = res.page.number + 1;
        this.totalPages = res.page.totalPages;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.error = true;
        this.tasks = [];
      },
    });
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  pageChanged(page: number): void {
    this.getTasks(page - 1, this.size, this.filter);
  }
}

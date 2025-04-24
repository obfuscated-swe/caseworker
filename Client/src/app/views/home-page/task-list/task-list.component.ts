import { Component, inject } from '@angular/core';
import { NoConnectionComponent } from '../../../components/error/no-connection/no-connection.component';
import { Task } from '../../../types/task';
import { TaskService } from '../../../services/task.service';
import { TaskComponent } from '../../../components/common/task/task.component';
import { GenericErrorComponent } from '../../../components/error/generic-error/generic-error.component';
import { EmptyFilterComponent } from '../../../components/error/empty-filter/empty-filter.component';

@Component({
  selector: 'task-list',
  imports: [NoConnectionComponent, TaskComponent, GenericErrorComponent, EmptyFilterComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  error: boolean = false;
  loading: boolean = true;
  tasks: Task[] = [];

  filteredTasks: Task[] = [];

  private taskService = inject(TaskService);

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (res: Task[]) => {
        console.log(res);
        this.loading = false;
        this.tasks = res;
        this.filteredTasks = res;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.error = true;
      },
    });
  }
}

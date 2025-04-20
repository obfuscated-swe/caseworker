import { Component, inject } from '@angular/core';
import { NoConnectionComponent } from '../../../components/error/no-connection/no-connection.component';
import { Task } from '../../../types/task';
import { TaskService } from '../../../services/task.service';
import { TaskComponent } from '../../../components/common/task/task.component';

@Component({
  selector: 'task-list',
  imports: [NoConnectionComponent, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  error: boolean = false;
  loading: boolean = true;
  tasks: Task[] = [];

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
        console.log(this.tasks);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.error = true;
      },
    });
  }
}

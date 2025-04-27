import { Component, inject } from '@angular/core';
import { StatusSelectorComponent } from '../../components/common/status-selector/status-selector.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Task, TaskStatus } from '../../types/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task-page',
  standalone: true,
  imports: [StatusSelectorComponent, FormsModule],
  templateUrl: './new-task-page.component.html',
  styleUrl: './new-task-page.component.css',
})
export class NewTaskPageComponent {
  selectedStatus: TaskStatus = TaskStatus.NotStarted;

  taskService: TaskService = inject(TaskService);

  submitTask(form: NgForm) {
    console.log(form);

    if (form.valid) {
      const task: Task = {
        id: 0,
        caseNumber: Math.floor(Math.random() * 100000 + 100000),
        title: form.value.title,
        description: form.value.description,
        status: form.value.status,
        dueDate: form.value.dueDate,
      };

      this.taskService.postTask(task).subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);
        },
        error: (err) => {
          console.error('Failed to create task:', err);
        },
      });

      console.log(task);
    } else {
      console.log('Form is invalid');
    }
  }
}

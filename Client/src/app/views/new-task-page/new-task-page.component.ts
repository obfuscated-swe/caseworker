import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task, TaskStatus } from '../../types/task';
import { TaskService } from '../../services/task.service';
import { TaskComponent } from '../../components/common/task/task.component';
import { StatusRadioComponent } from '../../components/common/status-radio/status-radio.component';

@Component({
  selector: 'app-new-task-page',
  standalone: true,
  imports: [StatusRadioComponent, FormsModule],
  templateUrl: './new-task-page.component.html',
  styleUrl: './new-task-page.component.css',
})
export class NewTaskPageComponent {
  errorMessage: string | null = null;
  newTask: Task | null = null;

  selectedStatus: TaskStatus = TaskStatus.NotStarted;
  taskService: TaskService = inject(TaskService);

  submitTask(form: NgForm) {
    if (form.valid) {
      const task: Task = {
        id: 0,
        caseNumber: form.value.caseNumber,
        title: form.value.title,
        description: form.value.description,
        status: form.value.status,
        dueDate: form.value.dueDate,
      };

      this.taskService.postTask(task).subscribe({
        next: (response) => {
          this.newTask = task;
          console.log('Task created successfully:', response);
        },
        error: (err) => {
          this.errorMessage = 'Failed to create task. Please try again.';
          console.error('Failed to create task:', err);
        },
      });
    } else {
      this.errorMessage = 'Form is missing required fields.';

      for (const control in form.controls) {
        if (form.controls[control].invalid) {
          document.getElementById(control)?.classList.add('govuk-form-group--error');
        }
      }
    }
  }
}

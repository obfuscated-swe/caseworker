import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { StatusList, Task, TaskStatus } from '../../../types/task';
import { DatePipe } from '../../../pipes/date.pipe';
import { StatusPrinterPipe } from '../../../pipes/status-printer.pipe';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task',
  imports: [DatePipe, StatusPrinterPipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: Task | null = null;

  /**
   * Event with the id of the task that was deleted
   */
  @Output() taskDeleted = new EventEmitter<number>();

  private taskService: TaskService = inject(TaskService);

  public showStatusOptions: boolean = false;
  public statusList = StatusList();
  public showSpinner: boolean = false;
  public showConfirmation: boolean = false;
  public showDeleteConfirmation: boolean = false;
  public showError: boolean = false;

  toggleStatusOptions() {
    this.showStatusOptions = !this.showStatusOptions;
  }

  async updateStatus(status: TaskStatus) {
    this.showSpinner = true;
    if (this.task) {
      this.task.status = status;

      // Optional delay to show the spinner for a minimum time
      await sleep(100);

      this.taskService.putTask(this.task).subscribe({
        next: (res) => {
          console.log('Task updated successfully');
          this.showSpinner = false;
          this.showConfirmation = true;
          if (this.showError) this.showError = false;
          setTimeout(() => {
            this.showConfirmation = false;
          }, 2000);
        },
        error: (err) => {
          console.error('Failed to update task:', err);
          this.showSpinner = false;
          this.showError = true;
        },
      });
    }
  }

  deleteTask() {
    this.showDeleteConfirmation = true;
  }

  confirmDeleteTask() {
    console.log('Deleting task...');
    if (this.task!.id === undefined) return;
    this.taskService.deleteTask(this.task!.id).subscribe({
      next: (res) => {
        console.log('Task deleted successfully');
        this.showDeleteConfirmation = false;
        this.taskDeleted.emit(this.task!.id!);
      },
      error: (err) => {
        console.error('Failed to delete task:', err);
        this.showDeleteConfirmation = false;
      },
    });
  }

  cancelDeleteTask() {
    this.showDeleteConfirmation = false;
  }

  /**
   *
   * @param event Keyboard event
   * @param fn function to call when the Enter key is pressed
   */
  onEnter(event: KeyboardEvent, fn: () => void) {
    if (event.key === 'Enter') {
      fn();
    }
  }
}

/**
 * Used so that the loading spinner can be shown on fast connections
 * This can be removed.
 *
 * @param ms How long to sleep in milliseconds
 * @returns A promise that resolves after the specified time
 */
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

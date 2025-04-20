import { Component, Input } from '@angular/core';
import { Task } from '../../../types/task';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../../../pipes/date.pipe';

@Component({
  selector: 'task',
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: Task | null = null;
}

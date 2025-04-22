import { Component, Input } from '@angular/core';
import { Task } from '../../../types/task';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../../../pipes/date.pipe';
import { StatusPrinterPipe } from '../../../pipes/status-printer.pipe';

@Component({
  selector: 'task',
  imports: [DatePipe, StatusPrinterPipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: Task | null = null;
}

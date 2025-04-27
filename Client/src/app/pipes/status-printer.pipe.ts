import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../types/task';

@Pipe({
  name: 'statusPrinter',
})
export class StatusPrinterPipe implements PipeTransform {
  transform(value: TaskStatus): string {
    switch (value) {
      case TaskStatus.NotStarted:
        return 'Not Started';
      case TaskStatus.InProgress:
        return 'In Progress';
      case TaskStatus.OnHold:
        return 'On Hold';
      case TaskStatus.Completed:
        return 'Completed';
      case TaskStatus.Cancelled:
        return 'Cancelled';
      default:
        return 'Unknown Status';
    }
  }
}

import { Component } from '@angular/core';
import { TaskStatus } from '../../../types/task';
import { seperateByCase } from '../../../utils/status.utils';

@Component({
  selector: 'status-selector',
  imports: [],
  templateUrl: './status-selector.component.html',
  styleUrl: './status-selector.component.css',
})
export class StatusSelectorComponent {
  humanReadableStatus(taskstatus: TaskStatus) {
    return seperateByCase(taskstatus);
  }

  statusList = [
    TaskStatus.NotStarted,
    TaskStatus.InProgress,
    TaskStatus.OnHold,
    TaskStatus.Completed,
    TaskStatus.Cancelled,
  ];
}

import { Component, forwardRef, Input } from '@angular/core';
import { TaskStatus } from '../../../types/task';
import { StatusPrinterPipe } from '../../../pipes/status-printer.pipe';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'status-selector',
  imports: [StatusPrinterPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusSelectorComponent),
      multi: true,
    },
  ],
  templateUrl: './status-selector.component.html',
  styleUrl: './status-selector.component.css',
})
export class StatusSelectorComponent implements ControlValueAccessor {
  @Input() lablel: string = 'Filter by status';
  @Input() type: 'checkboxes' | 'radios' = 'checkboxes';

  value: string = TaskStatus.NotStarted;

  statusList = [
    TaskStatus.NotStarted,
    TaskStatus.InProgress,
    TaskStatus.OnHold,
    TaskStatus.Completed,
    TaskStatus.Cancelled,
  ];

  onChange(value: any) {}
  onTouched() {}

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectStatus(status: string) {
    console.log('Selected status:', status);
    this.value = status;
    this.onChange(status);
    this.onTouched();
  }
}

import { Component, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { StatusList, TaskStatus } from '../../../types/task';
import { StatusPrinterPipe } from '../../../pipes/status-printer.pipe';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'status-radio',
  imports: [StatusPrinterPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusRadioComponent),
      multi: true,
    },
  ],
  templateUrl: './status-radio.component.html',
  styleUrl: './status-radio.component.css',
})
export class StatusRadioComponent implements ControlValueAccessor {
  @Input() lablel: string = 'Filter by status';

  public value: TaskStatus = TaskStatus.NotStarted;
  public statusList = StatusList();

  onChange(value: TaskStatus) {}
  onTouched() {}
  writeValue(value: TaskStatus): void {
    this.value = value || TaskStatus.NotStarted;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectStatus(status: TaskStatus) {
    this.value = status;

    this.onChange(this.value);
    this.onTouched();
  }
}

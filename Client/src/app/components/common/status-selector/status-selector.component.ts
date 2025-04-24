import { Component, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { StatusList, TaskStatus } from '../../../types/task';
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

  public statusList = StatusList();
  public value: TaskStatus[] = [];

  onChange(value: TaskStatus[]) {}
  onTouched() {}
  writeValue(value: TaskStatus[]): void {
    this.value = value || StatusList();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectStatus(status: TaskStatus) {
    if (this.value.indexOf(status) !== -1) {
      this.value.splice(this.value.indexOf(status), 1);
    } else {
      this.value.push(status);
    }
    this.onChange(this.value);
    this.onTouched();
  }
}

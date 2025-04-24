import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'task-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent implements ControlValueAccessor {
  search: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  inputChanged(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.search = value;
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.search = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

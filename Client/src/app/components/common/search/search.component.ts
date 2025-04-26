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
  public search: string = '';
  public searchTypeValue: string = 'id';
  public label: string = 'Search Task IDs';

  onChange = (value: string) => {};
  onTouched = () => {};

  selectChaged(value: string): void {
    this.searchTypeValue = value;
    this.label = value === 'id' ? 'Search Task IDs' : 'Search Task Case Numbers';
  }

  inputChanged(value: string): void {
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

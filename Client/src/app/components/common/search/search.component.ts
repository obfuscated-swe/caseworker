import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchObject, SearchType } from '../../../types/filter';

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
  public search: SearchObject = { type: 'id', value: '' };
  public label: string = 'Search Task by ID';

  onChange = (value: SearchObject) => {};
  onTouched = () => {};

  selectChaged(value: string): void {
    this.search.type = value as SearchType;
    this.label = value === 'id' ? 'Search Task by ID' : 'Search Task by Case Number';

    this.onChange(this.search);
  }

  inputChanged(value: string): void {
    this.search.value = value;

    this.onChange(this.search);
  }

  writeValue(value: SearchObject | null): void {
    if (value) {
      this.search = value;
      this.label = value.type === 'id' ? 'Search Task by ID' : 'Search Task by Case Number';
    } else {
      this.search = { type: 'id', value: '' };
      this.label = 'Search Task by ID';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

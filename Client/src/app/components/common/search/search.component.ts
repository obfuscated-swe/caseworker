import { Component, inject } from '@angular/core';

@Component({
  selector: 'task-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  search: string = '';

  inputChanged(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
  }
}

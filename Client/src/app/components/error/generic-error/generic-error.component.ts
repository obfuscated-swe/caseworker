import { Component, Input } from '@angular/core';

@Component({
  selector: 'generic-error',
  imports: [],
  templateUrl: './generic-error.component.html',
  styleUrl: './generic-error.component.css',
})
export class GenericErrorComponent {
  @Input() errorTitle: string = 'An error occurred';
  @Input() errorMessage: string = 'An unexpected error occurred. Please try again later.';
  @Input() errorLevel: 'info' | 'error' = 'error';
}

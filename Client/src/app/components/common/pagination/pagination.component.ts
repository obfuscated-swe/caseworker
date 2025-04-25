import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  public pageNumbers: number[] = [];

  ngOnChanges(): void {
    this.pageNumbers = this.pages();
  }

  pages(): number[] {
    const pages: number[] = [];

    // for (let i = 1; i <= this.totalPages; i++) {
    //   pages.push(i);
    // }

    pages.push(1);

    if (this.currentPage >= 4) {
      pages.push(0, this.currentPage - 1);
    } else {
      for (let i = 2; i < this.currentPage; i++) {
        pages.push(i);
      }
    }

    if (this.currentPage > 1) {
      pages.push(this.currentPage);
    }

    if (this.currentPage < this.totalPages - 2) {
      pages.push(this.currentPage + 1, 0, this.totalPages);
    } else if (this.currentPage < this.totalPages - 1) {
      pages.push(this.currentPage + 1, this.totalPages);
    }

    return pages;
  }

  updatePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.pageChange.emit(page);
  }

  decrementPage(): void {
    if (this.currentPage > 1) {
      const page = this.currentPage - 1;
      this.pageChange.emit(page);
    }
  }
  incrementPage(): void {
    if (this.currentPage < this.totalPages) {
      const page = this.currentPage + 1;
      this.pageChange.emit(page);
    }
  }
}

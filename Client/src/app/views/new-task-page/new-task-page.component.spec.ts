import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskPageComponent } from './new-task-page.component';
import { provideHttpClient } from '@angular/common/http';

describe('NewTaskPageComponent', () => {
  let component: NewTaskPageComponent;
  let fixture: ComponentFixture<NewTaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskPageComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

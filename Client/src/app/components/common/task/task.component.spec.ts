import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { provideHttpClient } from '@angular/common/http';
import { Task, TaskStatus } from '../../../types/task';
import { TaskService } from '../../../services/task.service';
import { of } from 'rxjs';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task description.',
    caseNumber: 12345,
    dueDate: new Date(),
    status: TaskStatus.NotStarted,
  };

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['putTask', 'deleteTask']);

    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [provideHttpClient(), { provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = { ...mockTask };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle status options', () => {
    expect(component.showStatusOptions).toBeFalse();
    component.toggleStatusOptions();
    expect(component.showStatusOptions).toBeTrue();
    component.toggleStatusOptions();
    expect(component.showStatusOptions).toBeFalse();
  });

  it('should update task status successfully', fakeAsync(() => {
    mockTaskService.putTask.and.returnValue(of());

    component.updateStatus(TaskStatus.InProgress);

    expect(component.task?.status).toBe(TaskStatus.InProgress);

    tick(500);
    expect(mockTaskService.putTask).toHaveBeenCalledWith(component.task);

    expect(component.showConfirmation).toBeFalse();
  }));

  it('should show delete confirmation when deleteTask is called', () => {
    expect(component.showDeleteConfirmation).toBeFalse();
    component.deleteTask();
    expect(component.showDeleteConfirmation).toBeTrue();
  });

  it('should cancel delete task', () => {
    component.showDeleteConfirmation = true;
    component.cancelDeleteTask();
    expect(component.showDeleteConfirmation).toBeFalse();
  });

  it('should confirm task deletion successfully', () => {
    mockTaskService.deleteTask.and.returnValue(of());

    component.confirmDeleteTask();

    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(mockTask.id);
    expect(component.showDeleteConfirmation).toBeFalse();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TaskService } from './task.service';
import { ApiService } from './api.service';
import { Task, TaskStatus } from '../types/task';
import { ServerURL } from '../../env/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TaskService],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a task by id', () => {
    const mockTask: Task = {
      id: 1,
      caseNumber: 1,
      title: 'Test Task',
      description: '',
      status: TaskStatus.TODO,
      dueDate: new Date(),
    };
    service.getTask(1).subscribe((task) => {
      console.log(task);
      expect(task).toEqual(mockTask);
    });
    const req = httpMock.expectOne(`${ServerURL}/tasks/id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });

  it('should get all tasks', () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        caseNumber: 1,
        title: 'Task 1',
        description: '',
        status: TaskStatus.TODO,
        dueDate: new Date(),
      },
      {
        id: 2,
        caseNumber: 2,
        title: 'Task 2',
        description: '',
        status: TaskStatus.TODO,
        dueDate: new Date(),
      },
    ];
    service.getAllTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });
    const req = httpMock.expectOne(`${ServerURL}/tasks/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should post a new task', () => {
    const newTask = { title: 'New Task' };
    service.postTask(newTask).subscribe((response) => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${ServerURL}/tasks/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(null);
  });

  it('should update a task', () => {
    const updatedTask = { id: 1, title: 'Updated Task' };
    service.putTask(updatedTask).subscribe((response) => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${ServerURL}/tasks/update`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(null);
  });

  it('should delete a task by id', () => {
    service.deleteTask(1).subscribe((response) => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${ServerURL}/tasks/delete/id=1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

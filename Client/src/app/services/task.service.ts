import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { Task } from '../types/task';
import { ServerURL } from '../../env/environment';
import { Page } from '../types/page';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private apiService: ApiService) {}

  getTask(id: number) {
    return this.apiService
      .get(`${ServerURL}/tasks/id=${id}`)
      .pipe(map((task: Task) => this.validator(task))) as Observable<Task>;
  }

  getAllTasks(page = 0, size = 10) {
    return this.apiService
      .get(`${ServerURL}/tasks/all?page=${page}&size=${size}`)
      .pipe(map((pagedTasks: Page<Task>) => this.validatePagedTasks(pagedTasks))) as Observable<
      Page<Task>
    >;
  }

  postTask(body: any) {
    return this.apiService.post(`${ServerURL}/tasks/add`, body).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    ) as Observable<void>;
  }

  putTask(body: any) {
    return this.apiService.put(`${ServerURL}/tasks/update`, body).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    ) as Observable<void>;
  }

  deleteTask(id: number) {
    return this.apiService.delete(`${ServerURL}/tasks/delete/id=${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    ) as Observable<void>;
  }

  private validatePagedTasks(pagedTasks: Page<Task>): Page<Task> {
    const tasks: Task[] = pagedTasks.content.map((task) => this.validator(task));
    pagedTasks.content = tasks;
    return pagedTasks;
  }

  /**
   *
   * @param task
   * @returns A clone of the task object with the dueDate property converted to a Date object.
   */
  private validator(task: Task): Task {
    return {
      id: task.id,
      caseNumber: task.caseNumber,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: new Date(task.dueDate),
    };
  }
}

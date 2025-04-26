import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { Task, TaskStatus } from '../types/task';
import { ServerURL } from '../../env/environment';
import { Page } from '../types/page';
import { Filter } from '../types/filter';

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

  getAllTasks(page = 0, size = 10, statusList: TaskStatus[] = []) {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('size', size.toString());
    if (statusList.length > 0) {
      params.set('statusList', statusList.join(','));
    }
    const url = `${ServerURL}/tasks/all?${params.toString()}`;

    console.log('URL:', url);

    return this.apiService
      .get(url)
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

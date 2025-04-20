import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Task } from '../types/task';
import { ServerURL } from '../../env/environment';

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
  getAllTasks() {
    return this.apiService
      .get(`${ServerURL}/tasks/all`)
      .pipe(map((tasks: Task[]) => this.validateTasks(tasks))) as Observable<Task[]>;
  }

  postTask(body: any) {
    return this.apiService.post(`${ServerURL}/tasks/add`, body) as Observable<void>;
  }

  putTask(body: any) {
    return this.apiService.put(`${ServerURL}/tasks/update`, body) as Observable<void>;
  }

  deleteTask(id: number) {
    return this.apiService.delete(`${ServerURL}/tasks/delete/id=${id}`) as Observable<void>;
  }

  private validateTasks(tasks: Task[]): Task[] {
    return tasks.map((task) => this.validator(task));
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

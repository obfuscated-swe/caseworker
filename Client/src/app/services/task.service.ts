import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Task } from '../types/task';
import { ServerURL } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private apiService: ApiService) {}

  getTask(id: number) {
    return this.apiService.get(`${ServerURL}/tasks/id=${id}`) as Observable<Task>;
  }

  getAllTasks() {
    return this.apiService.get(`${ServerURL}/tasks/all`) as Observable<Task[]>;
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
}

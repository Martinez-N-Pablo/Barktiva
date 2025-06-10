import { Injectable } from '@angular/core';
import { TaskTypes } from '../const/task';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _eventUrl = '';
  
  constructor(private _http: HttpClient) { }

  getTasks(): Observable<any> {
    return of(TaskTypes);
  }

  getTaskById(id: string): Observable<any> {
    return this._http.get<any>(`${this._eventUrl}/task/${id}`);
  }

  createTask(task: any): Observable<any> {
    return this._http.post<any>(`${this._eventUrl}/task`, task);
  }

  updateTask(id: string, task: any): Observable<any> {
    return this._http.put<any>(`${this._eventUrl}/task/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this._http.delete<any>(`${this._eventUrl}/task/${id}`);
  }
}

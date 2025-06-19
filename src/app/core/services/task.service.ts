import { inject, Injectable } from '@angular/core';
import { TaskTypes } from '../const/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _url: string = environment.backendURL || "";
  private _http: HttpClient = inject(HttpClient);

  constructor() { }

  createTask(body: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(`${this._url}/task`, body, { headers });
  }

  getAllTask(body: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(`${this._url}/task/task`, body, { headers });
  }

  getTaskById(taskId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(`${this._url}/task/${taskId}`, { headers });
  }

  updateTask(taskId: string, token: string, body: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put<any>(`${this._url}/task/${taskId}`, body, { headers });
  }

  deleteTask(taskId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete<any>(`${this._url}/task/${taskId}`, { headers });
  }

  getTaskTypes(): Observable<any> {
    return this._http.get<any>(`${this._url}/task/taskTypes`);
  }
}

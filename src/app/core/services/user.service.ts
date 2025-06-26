import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = environment.backendURL || "";
  private _http: HttpClient = inject(HttpClient);
  
  constructor() { }

  createUser(body: any): Observable<any> {
    return this._http.post<any>(`${this._url}/user`, body);
  }

  updateUser(body: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put<any>(`${this._url}/user`, body, { headers });
  }

  getUserData(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(`${this._url}/user`, { headers });
  }

  deleteUser(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete<any>(`${this._url}/user`, { headers });
  }
}

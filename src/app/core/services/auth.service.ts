import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = environment.backendURL || "";
  private _http: HttpClient = inject(HttpClient);

  constructor() { }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this._http.post<any>(`${this._url}/auth`, credentials);
  }

  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(`${this._url}/auth/verifyToken`, { headers });
  }
}

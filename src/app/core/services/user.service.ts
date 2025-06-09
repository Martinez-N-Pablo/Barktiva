import { HttpClient } from '@angular/common/http';
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
}

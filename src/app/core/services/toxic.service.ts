import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToxicService {
  private _url: string = environment.backendURL || "";
  private _http: HttpClient = inject(HttpClient);
  
  constructor() { }

  getToxics(): Observable<any> {
    return this._http.get<any>(`${this._url}/toxic`);
  }
}

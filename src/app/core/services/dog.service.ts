import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  private _auxDogs = [
    {
      "name": "Thor",
      "img": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
    },
    {
      "name": "Firulais",
      "img": "https://cdn2.thedogapi.com/images/SJyBfg5NX.jpg"
    },
    {
      "name": "Peludito",
      "img": "https://cdn2.thedogapi.com/images/6TqTQkO_O.jpg"
    },
    {
      "name": "Chica",
      "img": "https://cdn2.thedogapi.com/images/H1K2hx5Em.jpg"
    },
    {
      "name": "Roy",
      "img": "https://cdn2.thedogapi.com/images/Syd4xxqEm.jpg"
    },
    {
      "name": "Max",
      "img": "https://cdn2.thedogapi.com/images/S17ZilqNm.jpg"
    },
    {
      "name": "Spiderman",
      "img": "https://cdn2.thedogapi.com/images/r1j4ZUlE7.jpg"
    }
  ];

  private _eventUrl = 'https://api.thedogapi.com/v1/events';

  constructor(private _http: HttpClient) { }

  getDogs(): Observable<any[]> {
      return of(this._auxDogs);
  }

  getDogById(id: string): Observable<any> {
    return this._http.get<any>(`${this._eventUrl}/dog/${id}`);
  }

  createDog(dog: any): Observable<any> {
    return this._http.post<any>(`${this._eventUrl}/dog`, dog);
  }

  updateDog(id: string, dog: any): Observable<any> {
    return this._http.put<any>(`${this._eventUrl}/dog/${id}`, dog);
  }

  deleteDog(id: string): Observable<any> {
    return this._http.delete<any>(`${this._eventUrl}/dog/${id}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  _breeds = [
    {
      "name": "Labrador Retriever",
      "img": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
    },
    {
      "name": "Golden Retriever",
      "img": "https://cdn2.thedogapi.com/images/6TqTQkO_O.jpg"
    },
    {
      "name": "German Shepherd",
      "img": "https://cdn2.thedogapi.com/images/SJyBfg5NX.jpg"
    },
    {
      "name": "French Bulldog",
      "img": "https://cdn2.thedogapi.com/images/H1K2hx5Em.jpg"
    },
    {
      "name": "Bulldog",
      "img": "https://cdn2.thedogapi.com/images/rkiByec47.jpg"
    },
    {
      "name": "Poodle",
      "img": "https://cdn2.thedogapi.com/images/r1j4ZUlE7.jpg"
    },
    {
      "name": "Beagle",
      "img": "https://cdn2.thedogapi.com/images/Syd4xxqEm.jpg"
    },
    {
      "name": "Rottweiler",
      "img": "https://cdn2.thedogapi.com/images/r1xXEgcNX.jpg"
    },
    {
      "name": "Dachshund",
      "img": "https://cdn2.thedogapi.com/images/SyL3H3kE7.jpg"
    },
    {
      "name": "Yorkshire Terrier",
      "img": "https://cdn2.thedogapi.com/images/B12uzg9V7.jpg"
    },
    {
      "name": "Boxer",
      "img": "https://cdn2.thedogapi.com/images/ry1kWe5VQ.jpg"
    },
    {
      "name": "Siberian Husky",
      "img": "https://cdn2.thedogapi.com/images/S17ZilqNm.jpg"
    },
    {
      "name": "Cavalier King Charles Spaniel",
      "img": "https://cdn2.thedogapi.com/images/HJRBbe94Q.jpg"
    },
    {
      "name": "Shih Tzu",
      "img": "https://cdn2.thedogapi.com/images/BkrJjgcV7.jpg"
    },
    {
      "name": "Great Dane",
      "img": "https://cdn2.thedogapi.com/images/B1EdlkwV7.jpg"
    },
    {
      "name": "Doberman Pinscher",
      "img": "https://cdn2.thedogapi.com/images/HyL3bl94Q.jpg"
    },
    {
      "name": "Miniature Schnauzer",
      "img": "https://cdn2.thedogapi.com/images/SkNjqx9NQ.jpg"
    },
    {
      "name": "Australian Shepherd",
      "img": "https://cdn2.thedogapi.com/images/B1-llgq4m.jpg"
    },
    {
      "name": "Pembroke Welsh Corgi",
      "img": "https://cdn2.thedogapi.com/images/rJ6iQeqEm.jpg"
    },
    {
      "name": "Cocker Spaniel",
      "img": "https://cdn2.thedogapi.com/images/HkRcZe547.jpg"
    },
    {
      "name": "Maltese",
      "img": "https://cdn2.thedogapi.com/images/B1SVZpVNX.jpg"
    },
    {
      "name": "Chihuahua",
      "img": "https://cdn2.thedogapi.com/images/B1pDZx9Nm.jpg"
    },
    {
      "name": "Border Collie",
      "img": "https://cdn2.thedogapi.com/images/SFQWdh160.jpg"
    },
    {
      "name": "Basset Hound",
      "img": "https://cdn2.thedogapi.com/images/Syd4xxqEm.jpg"
    },
    {
      "name": "Bernese Mountain Dog",
      "img": "https://cdn2.thedogapi.com/images/S1fFlx5VX.jpg"
    },
    {
      "name": "Sheltie",
      "img": "https://cdn2.thedogapi.com/images/Bko0fl547.jpg"
    },
    {
      "name": "Boston Terrier",
      "img": "https://cdn2.thedogapi.com/images/rkZRggqVX.jpg"
    },
    {
      "name": "Pomeranian",
      "img": "https://cdn2.thedogapi.com/images/HJd0XecNX.jpg"
    },
    {
      "name": "Vizsla",
      "img": "https://cdn2.thedogapi.com/images/HyWacn94X.jpg"
    },
    {
      "name": "Newfoundland",
      "img": "https://cdn2.thedogapi.com/images/Sk7Qbg9E7.jpg"
    },
    {
      "name": "Mastiff",
      "img": "https://cdn2.thedogapi.com/images/ry8KWgqEQ.jpg"
    },
    {
      "name": "St. Bernard",
      "img": "https://cdn2.thedogapi.com/images/SkNjqx9NQ.jpg"
    },
    {
      "name": "Brittany",
      "img": "https://cdn2.thedogapi.com/images/H1pDZx9Nm.jpg"
    },
    {
      "name": "West Highland White Terrier",
      "img": "https://cdn2.thedogapi.com/images/SJ6f2Y5EX.jpg"
    },
    {
      "name": "Whippet",
      "img": "https://cdn2.thedogapi.com/images/rkVlblcEQ.jpg"
    },
    {
      "name": "Alaskan Malamute",
      "img": "https://cdn2.thedogapi.com/images/d2w3pZp5N.jpg"
    },
    {
      "name": "Collie",
      "img": "https://cdn2.thedogapi.com/images/S1fFlx5VX.jpg"
    },
    {
      "name": "Dalmatian",
      "img": "https://cdn2.thedogapi.com/images/S1_9KzQEQ.jpg"
    },
    {
      "name": "American Staffordshire Terrier",
      "img": "https://cdn2.thedogapi.com/images/BkK2kwqE7.jpg"
    },
    {
      "name": "English Springer Spaniel",
      "img": "https://cdn2.thedogapi.com/images/HkRcZe547.jpg"
    }
  ];

  private _auxPets = [
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

  private _url: string = environment.backendURL || "";
  private _http: HttpClient = inject(HttpClient);

  private _eventUrl = 'https://api.thedogapi.com/v1/events';

  getPets(): Observable<any[]> {
      return of(this._auxPets);
  }

  constructor() { }

  getBreeds(): Observable<any[]> {
    return of(this._breeds);
  }

  createPets(body: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(`${this._url}/pet`, body, { headers });
  }

  getPetById(petId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(`${this._url}/pet/${petId}`, { headers });
  }

  getAllPets(body: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post<any>(`${this._url}/pet/pets`, body, { headers });
  }

  updatePet(petId: string, token: string, body: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put<any>(`${this._url}/pet/${petId}`, body, { headers });
  }

  deletePet(petId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete<any>(`${this._url}/pet/${petId}`, { headers });
  }
}

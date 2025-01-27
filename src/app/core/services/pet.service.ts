import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  options = [
    {
      id: 1,
      name: 'Golden Retriever',
      image: 'https://example.com/images/golden-retriever.jpg',
    },
    {
      id: 2,
      name: 'German Shepherd',
      image: 'https://example.com/images/german-shepherd.jpg',
    },
    {
      id: 3,
      name: 'Labrador Retriever',
      image: 'https://example.com/images/labrador-retriever.jpg',
    },
    {
      id: 4,
      name: 'Bulldog',
      image: 'https://example.com/images/bulldog.jpg',
    },
    {
      id: 5,
      name: 'Beagle',
      image: 'https://example.com/images/beagle.jpg',
    },
    {
      id: 6,
      name: 'Poodle',
      image: 'https://example.com/images/poodle.jpg',
    },
    {
      id: 7,
      name: 'Rottweiler',
      image: 'https://example.com/images/rottweiler.jpg',
    },
    {
      id: 8,
      name: 'Siberian Husky',
      image: 'https://example.com/images/siberian-husky.jpg',
    },
    {
      id: 9,
      name: 'Dachshund',
      image: 'https://example.com/images/dachshund.jpg',
    },
    {
      id: 10,
      name: 'Boxer',
      image: 'https://example.com/images/boxer.jpg',
    },
  ];

  constructor() { }

  getBreeds(): Observable<any[]> {
    return of(this.options);
  }
}

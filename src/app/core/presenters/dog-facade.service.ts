import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { DogService } from '../services/dog.service';
import { Dog } from '../interfaces/dog';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogFacadeService {
  private _dogs: WritableSignal<Dog[]> = signal<Dog[]>([]); // Signal who stores dogs

  constructor(private _dogService: DogService) {
    this.loadBreeds();
  }

  // Método para obtener y transformar los datos
  loadBreeds(): void {
    this._dogService.getDogs()
      .pipe(
        map(dogs => dogs.map(breed => ({
          name: breed.name,
          img: breed.reference_image_id 
            ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
            : 'https://via.placeholder.com/150' // Imagen por defecto si no tiene
        })))
      )
      .subscribe(transformedBreeds => this._dogs.set(transformedBreeds));
  }

  // Método para exponer los datos al componente
  getBreeds(): WritableSignal<Dog[]> {
    return this._dogs;
  }
}

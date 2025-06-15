import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Dog } from '../interfaces/dog';
import { firstValueFrom, map, Observable } from 'rxjs';
import { PetInterface } from '../interfaces/pet';
import { Preferences } from '@capacitor/preferences';
import { getToken } from '../scripts/getToken';
import { ToasSuccessMessage, ToastErorMessage } from '../const/magicStrings';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PetFacadeService {
  private _dogs: WritableSignal<Dog[]> = signal<Dog[]>([]); // Signal who stores dogs
  private _petService: PetService = inject(PetService);
  private _toastService: ToastService = inject(ToastService);

  constructor() {
    this.loadBreeds();
  }

  // Metodo para obtener y transformar los datos
  loadBreeds(): void {
    this._petService.getPets()
      .pipe(
        map(pets => pets.map(breed => ({
          name: breed.name,
          img: breed.reference_image_id 
            ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
            : 'https://via.placeholder.com/150' // Imagen por defecto si no tiene
        })))
      )
      .subscribe(transformedBreeds => this._dogs.set(transformedBreeds));
  }

  // Método para exponer los datos al componente
  getBreeds(): Observable<PetInterface[]> {
    return this._petService.getBreeds(); // ya devuelve Observable
  }

  async createPet(pet: PetInterface): Promise<any> {
    console.log("crear")
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const user = JSON.parse(value as string);

    const userId = user.id || "";
    const token = user.token || "";

    pet.owner = userId;
    
    if(token) {
      return firstValueFrom(this._petService.createPets(pet, token))
        .then(response => {
          this._toastService.showToast(ToasSuccessMessage.createPet || "", 'success').then(() => true);
          return true;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.createPet || "", 'danger').then(() => false);
        });
    }
  }

  async updatePet(petId: string, pet: PetInterface): Promise<any> {
    console.log("modificar")
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const user = JSON.parse(value as string);

    const userId = user.id || "";
    const token = user.token || "";

    pet.owner = userId;
    
    if(token) {
      return firstValueFrom(this._petService.updatePet(petId, token, pet))
        .then(response => {
          this._toastService.showToast(ToasSuccessMessage.updatePet || "", 'success').then(() => true);
          return true;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.updatePet || "", 'danger').then(() => false);
        });
    }
  }
  
  async getPetById(id: string): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const token = JSON.parse(value as string).token || "";

    if(token) {
      return firstValueFrom(this._petService.getPetById(id, token))
        .then(response => {
          console.log(response);
          return response;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.getPetData || "", 'danger').then(() => false);
        });
    }
  }
}

import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Dog } from '../interfaces/dog';
import { firstValueFrom, map, Observable } from 'rxjs';
import { PetInterface } from '../interfaces/pet';
import { Preferences } from '@capacitor/preferences';
import { ToasSuccessMessage, ToastErorMessage } from '../const/magicStrings';
import { ToastService } from '../services/toast.service';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PetFacadeService {
  private _dogs: WritableSignal<Dog[]> = signal<Dog[]>([]); // Signal who stores dogs
  private _petService: PetService = inject(PetService);
  private _toastService: ToastService = inject(ToastService);

  petsPageIndex: number = environment.pageIndexStart || 1;
  petsPageSize: number = environment.pageSize || 10;
  petsOrder: string = environment.defaultOrder || "asc";

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
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const user = JSON.parse(value as string);

    const userId = user.id || "";
    const token = user.token || "";
    pet.owner = userId;

    const formData = new FormData();

    // Añadir todos los campos excepto el archivo
    Object.entries(pet).forEach(([key, val]) => {
      if (key !== 'photo' && val !== undefined && val !== null) {
        formData.append(key, val as string);
      }
    });

    // Se comprueba si la variable photo contiene valor y se comprueba como se ha podido que es un objeto tipo File
    if (pet.photo &&
        typeof pet.photo === 'object' &&
        'name' in pet.photo &&
        'type' in pet.photo &&
        'size' in pet.photo
    ) {
      formData.append('photo', pet.photo);
    }
    
    if(token) {
      return firstValueFrom(this._petService.createPets(formData, token))
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
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const user = JSON.parse(value as string);

    const userId = user.id || "";
    const token = user.token || "";
    pet.owner = userId;

    const formData = new FormData();

    // Añadir todos los campos excepto el archivo
    Object.entries(pet).forEach(([key, val]) => {
      if (key !== 'photo' && val !== undefined && val !== null) {
        formData.append(key, val as string);
      }
    });

    // Se comprueba si la variable photo contiene valor y se comprueba como se ha podido que es un objeto tipo File
    if (pet.photo &&
        typeof pet.photo === 'object' &&
        'name' in pet.photo &&
        'type' in pet.photo &&
        'size' in pet.photo
    ) {
      formData.append('photo', pet.photo);
    }
    
    if(token) {
      return firstValueFrom(this._petService.updatePet(petId, token, formData))
        .then(response => {
          this._toastService.showToast(ToasSuccessMessage.updatePet || "", 'success').then(() => true);
          return true;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.updatePet || "", 'danger').then(() => false);
        });
    }
  }
  
  async getAllPets(): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });

    const body = {
      page: this.petsPageIndex,
      size: this.petsPageSize,
      order: this.petsOrder,
    }
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const token = JSON.parse(value as string).token || "";

    if(token) {
      return firstValueFrom(this._petService.getAllPets(body, token))
        .then(response => {
          console.log(response);
          return response;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.getPetData || "", 'danger').then(() => false);
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

  async deletePet(petId: string): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const token = JSON.parse(value as string).token || "";

    if(token) {
      return firstValueFrom(this._petService.deletePet(petId, token))
        .then(response => {
          console.log(response);
          this._toastService.showToast(ToasSuccessMessage.deletePet || "", 'success').then(() => false);
          return response;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.deletePet || "", 'danger').then(() => false);
        });
    }
  }
}

import { PetInterface } from "./pet";
import { TaskInterface } from "./task";

export interface UserInterface {
  name: string;
  email: string;
  surname?: string;
  photo?: string;
  birthdate?: Date;
  pets?: PetInterface[];
  tasks?: TaskInterface[];
  role?: 'admin' | 'user';
}
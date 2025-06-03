import { Breed } from "./breed";

export interface Dog {
    name: string;
    img: string;
    breed?: Breed;
}

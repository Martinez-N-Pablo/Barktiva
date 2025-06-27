export interface PetInterface {
    _id: string;
    owner: string;
    name: string;
    breed: string;
    photo?: string;
    sex?: 'male' | 'female';
    age?: number;
    weight?: number;
    sterelized?: 's' | 'i' | '';
    tasks?: string[];
};
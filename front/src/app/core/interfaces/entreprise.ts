import { Mission } from './mission'; // Import the 'Mission' interface
export interface Entreprise {
    name: string;
    description?: string;
    linkLinkedin?: string;
    linkWebsite?: string;
    logo?: string;
    adress?: string;
    phoneNumber?: string;
    email?: string;
    category: 'startup' | 'company';
    missions: Mission[]; // Use the 'Mission' interface
    createdAt?: Date;
    updatedAt?: Date;
}

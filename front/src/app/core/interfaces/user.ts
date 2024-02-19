export interface User {
  _id: any|string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  role: 'candidat' | 'entreprise' | 'admin';
  _idEntreprise?: string; // Assuming _idEntreprise is a reference to another entity
  adress?: string;
  password: string;
  description?: string;
  linkLinkedin: string;
  linkGithub?: string;
  linkWebsite?: string;
  linkCV?: string;
  image?: string;
  skills: string[];
  experiences: string[];
  diplomas: string[];
  languages: string[];
  interests: string[];
  verified?: boolean;
  missions?: string[]; // Assuming missions is a reference to another entity
  applications?: string[]; // Assuming applications is a reference to another entity
}

export interface Application {
    mission: String;
    coverLetter?: string;
    statut: 'trash' | 'published' | 'archived';
    candidate: String;
}

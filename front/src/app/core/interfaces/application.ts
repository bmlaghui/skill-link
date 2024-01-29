export interface Application {
    _idMission: String[];
    coverLetter?: string;
    statut: 'draft' | 'published' | 'archived';
    _idUser: String[];
}

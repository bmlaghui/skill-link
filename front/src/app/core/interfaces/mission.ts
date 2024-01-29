export interface Mission {
    title: string;
    description?: string;
    requiredSkills: string[];
    _idEntreprise: String;
    isFinalClient: boolean;
    category: 'CDD' | 'CDI' | 'Potage salarial';
    tjm: number;
    _idMissionEntreprise?: String;
    dateDebut: Date;
    dateFin?: Date;
    renumeration?: number;
    previleges?: string[];
    status: 'draft' | 'published' | 'archived';
    candidats: String[];
    candidatsSelectionnes: String[];
    candidatsRefuses: String[];
    candidatsEnAttente: String[];
    candidatsRetenus: String[];
}

export interface Mission {
    currentPage: number
    totalPages: number
    totalMissionsCount: number
    missions: DetailsMission[]
  }
  
  export interface DetailsMission {
    title: string
    description: string
    requiredSkills: string[]
    entreprise: Entreprise
    isFinalClient: boolean
    category: string
    tjm: number
    missionEntreprise: MissionEntreprise
    dateDebut: string
    dateFin: string
    renumeration: number
    previleges: string[]
    status: string
    candidates: Candidate[]
    pendingCandidates: any[]
    rejectedCandidates: any[]
    retainedCandidates: any[]
    selectedCandidates: any[]
  }
  
  export interface Entreprise {
    name: string
    description: string
    linkLinkedin: string
    linkWebsite: string
    logo: string
    address: string
    phoneNumber: string
    email: string
    category: string
    createdAt: string
    updatedAt: string
  }
  
  export interface MissionEntreprise {
    name: string
    description: string
    linkLinkedin: string
    linkWebsite: string
    logo: string
    address: string
    phoneNumber: string
    email: string
    category: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Candidate {
    firstName: string
    lastName: string
    email: string
    username: string
    phoneNumber: string
    role: string
    _idEntreprise: any
    image: string
    adress: string
    password: string
    description: string
    linkLinkedin: string
    linkGithub: string
    linkWebsite: string
    linkCV: string
    skills: string[]
    experiences: string[]
    diplomas: string[]
    languages: string[]
    interests: string[]
    verified: boolean
    missions: any[]
    applications: any[]
    notifications: any[]
    createdAt: string
    updatedAt: string
  }
  
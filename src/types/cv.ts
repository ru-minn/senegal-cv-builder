export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  photo?: string; // Base64 encoded image or URL
  dateOfBirth?: string;
  nationality?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  location?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 scale
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Courant' | 'Langue maternelle';
}

export interface CVData {
  personalInfo: PersonalInfo;
  objective: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
}

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: 'Sénégal',
  postalCode: '',
  photo: undefined,
  dateOfBirth: '',
  nationality: '',
};

export const DEFAULT_CV_DATA: CVData = {
  personalInfo: DEFAULT_PERSONAL_INFO,
  objective: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
};

// Template types
export type TemplateType = 'modern' | 'classic';

export interface TemplateConfig {
  accentColor?: string;
  fontFamily?: string;
  fontSize?: 'small' | 'medium' | 'large';
}

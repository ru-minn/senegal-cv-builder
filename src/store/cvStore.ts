import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CVData,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Language,
  DEFAULT_CV_DATA,
} from '@/types/cv';

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'professional';
export type AccentColor = 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'teal';

interface CVStore {
  // State
  cvData: CVData;
  selectedTemplate: TemplateType;
  accentColor: AccentColor;

  // Personal Info Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Objective Actions
  updateObjective: (objective: string) => void;

  // Experience Actions
  setExperiences: (experiences: Experience[]) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  // Education Actions
  setEducation: (education: Education[]) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skill Actions
  setSkills: (skills: Skill[]) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // Language Actions
  setLanguages: (languages: Language[]) => void;
  addLanguage: (language: Omit<Language, 'id'>) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Template & Color Actions
  setTemplate: (template: TemplateType) => void;
  setAccentColor: (color: AccentColor) => void;

  // Reset Action
  resetCV: () => void;
}

// Helper function to generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      // Initial State
      cvData: DEFAULT_CV_DATA,
      selectedTemplate: 'modern',
      accentColor: 'blue',

      // Personal Info Actions
      updatePersonalInfo: (info) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            personalInfo: {
              ...state.cvData.personalInfo,
              ...info,
            },
          },
        })),

      // Objective Actions
      updateObjective: (objective) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            objective,
          },
        })),

      // Experience Actions
      setExperiences: (experiences) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences,
          },
        })),

      addExperience: (experience) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: [
              ...state.cvData.experiences,
              { ...experience, id: generateId() },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: state.cvData.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: state.cvData.experiences.filter((exp) => exp.id !== id),
          },
        })),

      // Education Actions
      setEducation: (education) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education,
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: [
              ...state.cvData.education,
              { ...education, id: generateId() },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.filter((edu) => edu.id !== id),
          },
        })),

      // Skill Actions
      setSkills: (skills) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills,
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: [...state.cvData.skills, { ...skill, id: generateId() }],
          },
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            ),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.filter((s) => s.id !== id),
          },
        })),

      // Language Actions
      setLanguages: (languages) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            languages,
          },
        })),

      addLanguage: (language) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            languages: [
              ...state.cvData.languages,
              { ...language, id: generateId() },
            ],
          },
        })),

      updateLanguage: (id, language) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            languages: state.cvData.languages.map((lang) =>
              lang.id === id ? { ...lang, ...language } : lang
            ),
          },
        })),

      removeLanguage: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            languages: state.cvData.languages.filter((lang) => lang.id !== id),
          },
        })),

      // Template & Color Actions
      setTemplate: (template) =>
        set(() => ({
          selectedTemplate: template,
        })),

      setAccentColor: (color) =>
        set(() => ({
          accentColor: color,
        })),

      // Reset Action
      resetCV: () =>
        set(() => ({
          cvData: DEFAULT_CV_DATA,
          selectedTemplate: 'modern',
          accentColor: 'blue',
        })),
    }),
    {
      name: 'cv-storage', // LocalStorage key
      partialize: (state) => ({
        cvData: state.cvData,
        selectedTemplate: state.selectedTemplate,
        accentColor: state.accentColor,
      }), // Only persist these fields
    }
  )
);

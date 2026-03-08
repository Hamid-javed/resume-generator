import { create } from 'zustand';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photoUrl: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  gpa: string;
  graduationYear: string;
  honors: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  category: 'technical' | 'soft' | 'language';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export type TemplateId = 'minimal' | 'executive' | 'bold' | 'developer';

interface ResumeState {
  data: ResumeData;
  templateId: TemplateId;
  activeSection: string;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addBullet: (expId: string) => void;
  updateBullet: (expId: string, index: number, text: string) => void;
  removeBullet: (expId: string, index: number) => void;
  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setTemplateId: (id: TemplateId) => void;
  setActiveSection: (section: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    photoUrl: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

export const useResumeStore = create<ResumeState>((set) => ({
  data: defaultData,
  templateId: 'minimal',
  activeSection: 'personal',

  setPersonalInfo: (info) =>
    set((s) => ({ data: { ...s.data, personalInfo: { ...s.data.personalInfo, ...info } } })),

  setSummary: (summary) =>
    set((s) => ({ data: { ...s.data, summary } })),

  addExperience: () =>
    set((s) => ({
      data: {
        ...s.data,
        experience: [
          ...s.data.experience,
          { id: generateId(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, bullets: [''] },
        ],
      },
    })),

  updateExperience: (id, exp) =>
    set((s) => ({
      data: {
        ...s.data,
        experience: s.data.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
      },
    })),

  removeExperience: (id) =>
    set((s) => ({
      data: { ...s.data, experience: s.data.experience.filter((e) => e.id !== id) },
    })),

  addBullet: (expId) =>
    set((s) => ({
      data: {
        ...s.data,
        experience: s.data.experience.map((e) =>
          e.id === expId ? { ...e, bullets: [...e.bullets, ''] } : e
        ),
      },
    })),

  updateBullet: (expId, index, text) =>
    set((s) => ({
      data: {
        ...s.data,
        experience: s.data.experience.map((e) =>
          e.id === expId
            ? { ...e, bullets: e.bullets.map((b, i) => (i === index ? text : b)) }
            : e
        ),
      },
    })),

  removeBullet: (expId, index) =>
    set((s) => ({
      data: {
        ...s.data,
        experience: s.data.experience.map((e) =>
          e.id === expId ? { ...e, bullets: e.bullets.filter((_, i) => i !== index) } : e
        ),
      },
    })),

  addEducation: () =>
    set((s) => ({
      data: {
        ...s.data,
        education: [
          ...s.data.education,
          { id: generateId(), degree: '', institution: '', gpa: '', graduationYear: '', honors: '' },
        ],
      },
    })),

  updateEducation: (id, edu) =>
    set((s) => ({
      data: {
        ...s.data,
        education: s.data.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
      },
    })),

  removeEducation: (id) =>
    set((s) => ({
      data: { ...s.data, education: s.data.education.filter((e) => e.id !== id) },
    })),

  addSkill: () =>
    set((s) => ({
      data: {
        ...s.data,
        skills: [...s.data.skills, { id: generateId(), name: '', level: 'intermediate', category: 'technical' }],
      },
    })),

  updateSkill: (id, skill) =>
    set((s) => ({
      data: {
        ...s.data,
        skills: s.data.skills.map((sk) => (sk.id === id ? { ...sk, ...skill } : sk)),
      },
    })),

  removeSkill: (id) =>
    set((s) => ({
      data: { ...s.data, skills: s.data.skills.filter((sk) => sk.id !== id) },
    })),

  setTemplateId: (templateId) => set({ templateId }),
  setActiveSection: (activeSection) => set({ activeSection }),
}));

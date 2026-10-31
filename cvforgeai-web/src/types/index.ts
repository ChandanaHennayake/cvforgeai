export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface Resume {
  id: number;
  title: string;
  fullName: string;
  professionalTitle: string;
  email: string;
  phoneNumber: string;
  location: string;
  linkedInUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  templateId: string;
  themeColorHex: string;
  summary: string;
  createdAt: string;
}

export interface Experience {
  id?: number;
  resumeId: number;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentRole?: boolean;
  description: string;
}

export interface Education {
  id?: number;
  resumeId: number;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
}

export interface Skill {
  id?: number;
  resumeId: number;
  name: string;
  category?: string;
  proficiencyLevel?: string;
}

export interface Project {
  id?: number;
  resumeId: number;
  title: string;
  description: string;
  techStack?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Certificate {
  id?: number;
  resumeId: number;
  name: string;
  issuingOrganization: string;
  issueDate?: string;
  credentialUrl?: string;
}

export interface ResumeDetail extends Resume {
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
}

export interface ATSScoreBreakdown {
  score: number;
  feedback: string[];
  aiSuggestions: string;
}

export interface JobMatchResult {
  matchPercentage: number;
  missingSkills: string[];
  suggestions: string;
}

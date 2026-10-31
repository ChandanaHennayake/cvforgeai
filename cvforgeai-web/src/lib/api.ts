import {
  AuthResponse,
  Resume,
  ResumeDetail,
  ATSScoreBreakdown,
  JobMatchResult,
  User,
  Experience,
  Education,
  Skill,
  Project,
  Certificate,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5172/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("cvforge_jwt");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorMsg = `Request failed: ${response.statusText}`;
    try {
      const errJson = await response.json();
      errorMsg = errJson.message || errJson.error || JSON.stringify(errJson);
    } catch {
      // fallback
    }
    throw new ApiError(response.status, errorMsg);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text() as unknown as T;
}

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<AuthResponse> => {
      const data = await request<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (data.token && typeof window !== "undefined") {
        localStorage.setItem("cvforge_jwt", data.token);
      }
      return data;
    },
    register: async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
      return request<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ fullName, email, password }),
      });
    },
    me: async (): Promise<User> => {
      return request<User>("/auth/me");
    },
    logout: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cvforge_jwt");
        localStorage.removeItem("cvforge_user");
      }
    },
    getToken: (): string | null => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("cvforge_jwt");
      }
      return null;
    },
  },

  resume: {
    getAll: async (): Promise<Resume[]> => {
      return request<Resume[]>("/resume");
    },
    getById: async (id: number): Promise<Resume> => {
      return request<Resume>(`/resume/${id}`);
    },
    getFull: async (id: number): Promise<ResumeDetail> => {
      return request<ResumeDetail>(`/resume/${id}/full`);
    },
    create: async (data: Partial<Resume>): Promise<string> => {
      return request<string>("/resume", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    duplicate: async (id: number): Promise<Resume> => {
      return request<Resume>(`/resume/${id}/duplicate`, {
        method: "POST",
      });
    },
    update: async (id: number, data: Partial<Resume>): Promise<{ message: string }> => {
      return request<{ message: string }>(`/resume/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: number): Promise<{ message: string }> => {
      return request<{ message: string }>(`/resume/${id}`, {
        method: "DELETE",
      });
    },
    generateAiSummary: async (resumeId: number): Promise<string> => {
      return request<string>(`/resume/${resumeId}/generate-ai-summary`, {
        method: "POST",
      });
    },
    analyzeResume: async (resumeId: number): Promise<ATSScoreBreakdown> => {
      return request<ATSScoreBreakdown>(`/resume/${resumeId}/analyze`, {
        method: "POST",
      });
    },
    matchJob: async (resumeId: number, jobDescription: string): Promise<JobMatchResult> => {
      return request<JobMatchResult>("/resume/match-job", {
        method: "POST",
        body: JSON.stringify({ resumeId, jobDescription }),
      });
    },
    downloadPdfUrl: (resumeId: number): string => {
      return `${API_BASE_URL}/resume/${resumeId}/pdf`;
    },
  },

  experience: {
    create: async (data: Partial<Experience>): Promise<Experience> => {
      return request<Experience>("/experience", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    update: async (id: number, data: Partial<Experience>): Promise<{ message: string }> => {
      return request<{ message: string }>(`/experience/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: number): Promise<{ message: string }> => {
      return request<{ message: string }>(`/experience/${id}`, {
        method: "DELETE",
      });
    },
  },

  education: {
    create: async (data: Partial<Education>): Promise<Education> => {
      return request<Education>("/education", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: number): Promise<{ message: string }> => {
      return request<{ message: string }>(`/education/${id}`, {
        method: "DELETE",
      });
    },
  },

  skill: {
    create: async (data: Partial<Skill>): Promise<Skill> => {
      return request<Skill>("/skill", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: number): Promise<{ message: string }> => {
      return request<{ message: string }>(`/skill/${id}`, {
        method: "DELETE",
      });
    },
  },

  project: {
    create: async (data: Partial<Project>): Promise<Project> => {
      return request<Project>("/project", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: number): Promise<{ message: string }> => {
      return request<{ message: string }>(`/project/${id}`, {
        method: "DELETE",
      });
    },
  },

  certificate: {
    create: async (data: Partial<Certificate>): Promise<Certificate> => {
      return request<Certificate>("/certificate", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: number): Promise<{ message: string }> => {
      return request<{ message: string }>(`/certificate/${id}`, {
        method: "DELETE",
      });
    },
  },
};

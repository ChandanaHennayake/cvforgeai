# AGENTS.md - CvForgeAI Autonomous Development Directives

Welcome to **CvForgeAI**. This document defines the mission, system architecture, agent personas, conventions, and implementation roadmap for all AI agents working on this repository.

---

## 1. Project Vision: Why CvForgeAI Is Not a Common CV Site

Standard resume builders are static form-fillers that export rigid, low-quality templates. **CvForgeAI** is an **intelligent, AI-powered CV Forge & Career Copilot** designed to dynamically analyze, engineer, optimize, and tailor resumes for maximum ATS (Applicant Tracking System) pass rates and recruiter impact.

### Core Differentiators
1. **Multi-Stage AI Intelligence**: Real-time bullet-point enhancement, ATS compatibility scoring, automated keyword gap analysis, and executive summary generation.
2. **Semantic Job Matching**: Dynamic alignment against real job descriptions to calculate match percentages and suggest precise keyword tailoring.
3. **High-Precision PDF Engine**: Programmatic, pixel-perfect, ATS-parseable document generation via QuestPDF with support for multiple designer themes.
4. **Living Career Profile**: Modular architecture allowing users to maintain a master profile and forge specialized, job-targeted variants.

---

## 2. System Architecture & Tech Stack

The solution follows strict **Clean Architecture** principles in **.NET 10**:

```
CvForgeAI (Root)
│
├── CvForgeAI.Domain/           # Enterprise Entities, Value Objects, Enums (Zero external dependencies)
├── CvForgeAI.Application/      # Use Cases, DTOs, Service Interfaces, Validators (FluentValidation), AI Abstractions
├── CvForgeAI.Infrastructure/   # AppDbContext, EF Core, Repositories, External Services (QuestPDF, OpenRouter HTTP)
├── CvForgeAI.API/              # Controllers, Middlewares, Dependency Injection, Program.cs
└── (Upcoming Frontend)/        # Modern Web UI with interactive live preview and rich aesthetics
```

### Key Libraries & Infrastructure
- **Framework**: .NET 10 Web API
- **Persistence**: Entity Framework Core 10, Microsoft SQL Server
- **Authentication**: JWT Bearer Tokens with ASP.NET Core Identity / Claims
- **Validation**: FluentValidation with automatic model validation
- **PDF Generation**: QuestPDF (Community License)
- **AI Integration**: OpenRouter API (`deepseek/deepseek-chat`, `anthropic/claude-3.5-sonnet`, `openai/gpt-4o-mini`)

---

## 3. Specialized Agent Personas & Protocols

When executing tasks in this workspace, adopt the following specialized roles:

### 🏛️ Lead Architect Agent
- Enforces Clean Architecture boundaries: Domain must never reference outer layers; Application defines interfaces; Infrastructure implements them.
- Guarantees API RESTfulness, versioning, consistent HTTP status codes, and ProblemDetails error handling.

### ⚙️ Backend .NET Specialist
- Ensures complete CRUD coverage for all CV entities (`Resume`, `Experience`, `Education`, `Skill`, `Project`, `Certificate`).
- Implements transaction safety, ownership verification (`ResumeBelongsToUserAsync`), and proper EF Core tracking/no-tracking optimizations.
- Fixes structural inconsistencies (e.g., renaming double-extended files like `AuthController.cs.cs`).

### 🤖 AI Intelligence & Prompt Engineer
- Implements structured, resilient AI calling patterns with fallback models, exponential backoff, and JSON schema enforcement.
- Eliminates brittle string-stripping of markdown code blocks.
- Designs comprehensive ATS scoring algorithms evaluating quantifiable metrics, action verbs, skills density, and job alignment.

### 📄 Document & PDF Engine Specialist
- Builds modular QuestPDF components for diverse layout archetypes (Modern Executive, Minimalist ATS, Tech Specialist, Creative).
- Ensures high readability, vector font rendering, and ATS parser readability.

### 🎨 Frontend & Experience Specialist
- Will construct the future frontend with a rich visual design, dark/light theme, live split-pane CV preview, and real-time AI suggestions.

---

## 4. Current State Audit & Immediate Gaps

1. **Child Entity Operations**: `Experience`, `Education`, `Skill`, `Project`, and `Certificate` only have `Create` and `GetResume...`. **Update and Delete are missing**.
2. **Resume Data Completeness**: The `Resume` domain model lacks personal contact details (phone, personal email, location, LinkedIn, GitHub, portfolio URL, target headline).
3. **File Naming Defect**: `CvForgeAI.API/Controllers/AuthController.cs.cs` has a duplicate `.cs` extension.
4. **AI Architecture**: AI Service mixes `RestClient` and `HttpClient`, hardcodes legacy models (`gpt-3.5-turbo`), and lacks structured JSON parsing fallbacks and error handling.
5. **Security & Validation**: API keys must be loaded securely via user secrets / environment variables rather than plaintext in `appsettings.json`. FluentValidation is missing for Resume and child entities.
6. **Frontend**: No web application interface currently exists.

---

## 5. Development Guidelines & Best Practices

- **Never write monolithic controllers**: Delegate business logic and AI orchestration to Application services.
- **Always verify resource ownership**: Every endpoint operating on a Resume or sub-item must verify that the requesting authenticated user owns the resource.
- **Graceful AI Degradation**: If an AI request fails, provide informative error responses without crashing the application.
- **Run dotnet build**: Always verify that `.slnx` builds cleanly with zero errors before concluding any task.

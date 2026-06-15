# CVForgeAI 🚀

## AI-Powered Resume Builder SaaS Platform

CVForgeAI is an AI-powered Resume Builder SaaS platform built with ASP.NET Core .NET 10 and Clean Architecture.

The platform allows users to create, manage, and optimize professional resumes while leveraging AI-powered capabilities such as resume summary generation and resume analysis. CVForgeAI integrates with modern Large Language Models (LLMs) through OpenRouter to help users create ATS-friendly resumes and improve their chances of landing interviews.

---

## Features

### Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization
* Secure Password Hashing
* Protected API Endpoints

### Resume Management

* Create Resume
* Update Resume
* Delete Resume
* View Resume Details
* Manage Multiple Resumes
* Resume Ownership Validation

### Experience Management

* Add Work Experience
* Edit Work Experience
* Delete Work Experience
* Current Job Support
* Employment History Tracking

### Skills Management

* Add Skills
* Update Skills
* Delete Skills
* Resume Skill Organization

### Certificate Management

* Add Professional Certifications
* Update Certifications
* Delete Certifications
* Credential URL Support
* Issue Date Tracking

### AI Features

* AI Resume Summary Generation
* AI Resume Analysis
* Resume Improvement Suggestions
* ATS Optimization Recommendations
* Professional Content Enhancement
* OpenRouter Integration
* DeepSeek Model Integration
* OpenAI Compatible API Support

### Validation & Error Handling

* FluentValidation
* Request Validation
* Custom Exceptions
* Global Exception Middleware
* Consistent API Responses

---

## Architecture

This project follows Clean Architecture principles to ensure maintainability, scalability, and separation of concerns.

```text
CVForgeAI
│
├── CVForgeAI.API
│   ├── Controllers
│   ├── Middleware
│   ├── Extensions
│   └── Program.cs
│
├── CVForgeAI.Application
│   ├── Abstractions
│   ├── DTOs
│   ├── Services
│   ├── Validators
│   ├── Exceptions
│   └── Common
│
├── CVForgeAI.Domain
│   ├── Entities
│   └── Common
│
├── CVForgeAI.Infrastructure
│   ├── Persistence
│   ├── Repositories
│   ├── Authentication
│   └── Services
│
└── CVForgeAI.sln
```

---

## Technology Stack

### Backend

* ASP.NET Core Web API
* .NET 10
* C#
* Entity Framework Core
* SQL Server

### Security

* JWT Authentication
* Authorization Policies
* Password Hashing

### Validation

* FluentValidation

### AI Integration

* OpenRouter API
* DeepSeek Models
* OpenAI-Compatible APIs

### Design Patterns

* Clean Architecture
* Repository Pattern
* Dependency Injection
* Middleware Pattern

---

## Core Entities

### User

Represents an authenticated user within the platform.

Properties:

* Id
* FullName
* Email
* PasswordHash
* Role

### Resume

Represents a professional resume owned by a user.

Properties:

* Id
* Title
* Summary
* CreatedAt
* UserId

### Experience

Represents a user's employment history.

Properties:

* Id
* CompanyName
* Position
* Description
* StartDate
* EndDate
* IsCurrentJob
* ResumeId

---

## AI Resume Summary Generation

The platform can generate professional resume summaries using AI.

### Workflow

1. User enters resume information.
2. User requests AI summary generation.
3. Prompt is sent to OpenRouter.
4. AI generates a professional summary.
5. User reviews and saves the generated content.

### Benefits

* Professional wording
* ATS-friendly content
* Faster resume creation
* Improved resume quality

---

## AI Resume Analysis

The system can analyze resume content and provide feedback.

### Analysis Includes

* Content quality assessment
* Professional writing suggestions
* Resume enhancement recommendations
* ATS optimization guidance
* General improvement feedback

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Resume

```http
GET    /api/resumes
GET    /api/resumes/{id}
POST   /api/resumes
PUT    /api/resumes/{id}
DELETE /api/resumes/{id}
```

### Experience

```http
GET    /api/experiences
GET    /api/experiences/{id}
POST   /api/experiences
PUT    /api/experiences/{id}
DELETE /api/experiences/{id}
```

### Skills

```http
GET    /api/skills
POST   /api/skills
PUT    /api/skills/{id}
DELETE /api/skills/{id}
```

### Certificates

```http
GET    /api/certificates
POST   /api/certificates
PUT    /api/certificates/{id}
DELETE /api/certificates/{id}
```

### AI Features

```http
POST /api/ai/generate-summary
POST /api/ai/analyze-resume
```

---

## Getting Started

### Prerequisites

* .NET 10 SDK
* SQL Server
* Visual Studio 2026 or later

### Clone Repository

```bash
git clone https://github.com/your-username/CVForgeAI.git
```

### Navigate To Project

```bash
cd CVForgeAI
```

### Restore Packages

```bash
dotnet restore
```

### Configure Database

Update `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_SQL_SERVER_CONNECTION_STRING"
  }
}
```

### Configure OpenRouter

```json
{
  "OpenRouter": {
    "ApiKey": "YOUR_OPENROUTER_API_KEY"
  }
}
```

### Apply Migrations

```bash
dotnet ef database update
```

### Run Application

```bash
dotnet run
```

### Swagger

```text
https://localhost:7223/swagger
```

---

## Future Enhancements

* ATS Resume Scoring
* AI Cover Letter Generator
* Resume Templates
* PDF Export
* LinkedIn Profile Import
* Credit-Based AI Usage System
* Subscription Plans
* Resume Versioning
* Public Resume Sharing
* Multi-Language Resume Generation

---

## What I Learned

This project demonstrates practical experience with:

* ASP.NET Core Web API Development
* Clean Architecture
* Repository Pattern
* Entity Framework Core
* SQL Server
* JWT Authentication
* FluentValidation
* Global Exception Handling
* Dependency Injection
* REST API Design
* Third-Party API Integration
* AI Service Integration
* OpenRouter Integration
* SaaS Application Design

---

## Author

Ravi Hennayaka

Software Engineer (.NET)

CVForgeAI is an ongoing AI-powered SaaS project designed to help job seekers create better resumes using modern software engineering practices and AI-assisted tools.

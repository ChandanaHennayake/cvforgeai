---
name: cvforge-workflow
description: >-
  Development workflows, build commands, and execution runbooks for CvForgeAI (.NET 10 Web API and ecosystem).
---

# CvForgeAI Development & Build Runbook

This skill outlines the standard commands and procedures for developing, building, and running CvForgeAI.

## 1. Solution Build & Validation
To build the solution and verify zero compilation errors:
```bash
dotnet build
```

## 2. Running the API Locally
To start the backend API with hot reload:
```bash
dotnet run --project CvForgeAI.API
```
The API Swagger / OpenAPI interface will be accessible at:
- `https://localhost:7189/swagger` or `http://localhost:5247/swagger` (check `Properties/launchSettings.json`).

## 3. Entity Framework Core Migrations
When updating domain models or the `AppDbContext`:
```bash
# Add a new migration
dotnet ef migrations add <MigrationName> --project CvForgeAI.Infrastructure --startup-project CvForgeAI.API

# Apply migrations to database
dotnet ef database update --project CvForgeAI.Infrastructure --startup-project CvForgeAI.API
```

## 4. Key Endpoints Reference
- `POST /api/auth/register`: Register user
- `POST /api/auth/login`: Authenticate and receive JWT
- `GET /api/resume`: Fetch all resumes for authenticated user
- `POST /api/resume`: Create new resume
- `GET /api/resume/{id}/pdf`: Generate and stream ATS-friendly PDF
- `POST /api/resume/{id}/generate-ai-summary`: AI generates professional summary
- `POST /api/resume/{id}/analyze`: AI scores resume and provides ATS tips
- `POST /api/resume/match-job`: Compare resume against job description

# Backend .NET 10 Engineering Rules

## 1. Clean Architecture Boundaries
- **CvForgeAI.Domain**: Entities, Enums, Value Objects, Domain Exceptions. Never reference EntityFrameworkCore, ASP.NET Core, or external packages here.
- **CvForgeAI.Application**: Use cases, DTOs, Repository interfaces (`IResumeRepository`, etc.), Service interfaces, FluentValidation validators. Business rules belong here.
- **CvForgeAI.Infrastructure**: `AppDbContext`, repository implementations, external integrations (QuestPDF, OpenRouter AI, SMTP, storage).
- **CvForgeAI.API**: Controllers, filters, middleware, dependency injection configuration in `Program.cs`. Controllers must remain thin coordinators.

## 2. API Design & Security
- **Authentication**: All endpoints mutating or fetching resume data must be decorated with `[Authorize]`.
- **User Ownership**: Never trust client-supplied user IDs. Extract the user ID directly from `User.FindFirst(ClaimTypes.NameIdentifier)?.Value`.
- **Authorization Verification**: Validate that the target resume belongs to the authenticated user using `ResumeBelongsToUserAsync(resumeId, userId)` before any read, update, delete, or AI action.
- **Status Codes**:
  - `200 OK` / `201 Created` for successful operations.
  - `400 Bad Request` for validation failures.
  - `401 Unauthorized` / `403 Forbidden` for auth issues.
  - `404 Not Found` for non-existent or unowned resources.
- **Consistent Response DTOs**: Never return EF Core entity classes directly from controllers. Always project into typed DTOs.

## 3. CRUD Completeness
Every resource (`Resume`, `Experience`, `Education`, `Skill`, `Project`, `Certificate`) must provide full CRUD support:
- `Create`
- `GetById`
- `GetByResumeId` / `GetMyResumes`
- `Update`
- `Delete`

## 4. Entity Framework Core Practices
- Use `AsNoTracking()` for read-only queries to maximize performance.
- Use explicit migrations (`dotnet ef migrations add <Name> --project CvForgeAI.Infrastructure --startup-project CvForgeAI.API`).
- Configure entity relationships and foreign key cascades cleanly in `AppDbContext.OnModelCreating`.

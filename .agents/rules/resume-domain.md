# Resume Domain & Data Specification

## 1. Resume Entity Completeness
A comprehensive resume requires rich contact details and presentation metadata that must be stored on the `Resume` or associated entity:
- **Personal Details**:
  - `FullName`: Display name on the resume
  - `ProfessionalTitle`: Target headline (e.g. "Senior Full-Stack Engineer")
  - `Email`: Contact email
  - `PhoneNumber`: International phone format
  - `Location`: City, State/Country
  - `LinkedInUrl`: Profile link
  - `GitHubUrl`: Code portfolio link
  - `PortfolioUrl`: Personal website
- **Layout & Styling Configuration**:
  - `TemplateId`: Selected layout theme (e.g. "classic-ats", "modern-executive", "tech-minimal")
  - `PrimaryColor`: Accent color hex code
  - `FontFamily`: Font selection for typography
  - `SectionOrder`: Comma-separated list or JSON array dictating section display order

## 2. Child Entity Validation & Schemas
- **Experience**:
  - Company, Position, Location, StartDate, EndDate, IsCurrentRole, Description (Bullet points).
- **Education**:
  - Institution, Degree, FieldOfStudy, StartDate, EndDate, Grade/GPA.
- **Skill**:
  - Name, Category (Technical, Soft, Language, Tool), ProficiencyLevel (Beginner, Intermediate, Advanced, Expert).
- **Project**:
  - Title, Description, TechStack, LiveUrl, GitHubUrl.
- **Certificate**:
  - Name, IssuingOrganization, IssueDate, ExpirationDate, CredentialUrl.

## 3. PDF Generation Directives
- PDF generation via QuestPDF must adhere to ATS parsing best practices:
  - Linear single-column or clean dual-column flow.
  - Standard font embedding (e.g., Roboto, Lato, Inter).
  - Clear section separators and readable margins (minimum 0.5 inches / 36 pt).
  - Selectable text without rasterized text images.

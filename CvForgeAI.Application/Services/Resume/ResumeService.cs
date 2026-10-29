using CvForgeAI.Application.Abstractions.Repositories;
using CvForgeAI.Application.DTO.Certificate;
using CvForgeAI.Application.DTO.Education;
using CvForgeAI.Application.DTO.Experience;
using CvForgeAI.Application.DTO.Project;
using CvForgeAI.Application.DTO.Resume;
using CvForgeAI.Application.DTO.Skill;
using CvForgeAI.Application.Exceptions;
using CvForgeAI.Application.Services.AI;

namespace CvForgeAI.Application.Services.Resume;

public class ResumeService : IResumeService
{
    private readonly IResumeRepository _resumeRepository;
    private readonly ISkillRepository _skillRepository;
    private readonly IProjectRepository _projectRepository;
    private readonly IExperienceRepository _experienceRepository;
    private readonly IEducationRepository _educationRepository;
    private readonly ICertificateRepository _certificateRepository;
    private readonly IAIService _aiService;

    public ResumeService(
        IResumeRepository resumeRepository,
        ISkillRepository skillRepository,
        IProjectRepository projectRepository,
        IExperienceRepository experienceRepository,
        IEducationRepository educationRepository,
        ICertificateRepository certificateRepository,
        IAIService aiService)
    {
        _resumeRepository = resumeRepository;
        _skillRepository = skillRepository;
        _projectRepository = projectRepository;
        _experienceRepository = experienceRepository;
        _educationRepository = educationRepository;
        _certificateRepository = certificateRepository;
        _aiService = aiService;
    }

    public async Task<string> CreateAsync(
        Guid userId,
        CreateResumeRequest request)
    {
        var resume = new Domain.Entities.Resume
        {
            Title = request.Title,
            FullName = request.FullName,
            ProfessionalTitle = request.ProfessionalTitle,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Location = request.Location,
            LinkedInUrl = request.LinkedInUrl,
            GitHubUrl = request.GitHubUrl,
            PortfolioUrl = request.PortfolioUrl,
            TemplateId = string.IsNullOrWhiteSpace(request.TemplateId) ? "classic-ats" : request.TemplateId,
            ThemeColorHex = string.IsNullOrWhiteSpace(request.ThemeColorHex) ? "#4F46E5" : request.ThemeColorHex,
            Summary = request.Summary,
            UserId = userId
        };

        await _resumeRepository.AddAsync(resume);

        await _resumeRepository.SaveChangesAsync();

        return "Resume created successfully.";
    }

    public async Task<List<ResumeResponse>> GetUserResumesAsync(
        Guid userId)
    {
        var resumes = await _resumeRepository
            .GetUserResumesAsync(userId);

        return resumes.Select(x => MapToResponse(x)).ToList();
    }

    public async Task<ResumeResponse> GetByIdAsync(
        Guid userId,
        int resumeId)
    {
        var resume = await _resumeRepository.GetByIdAsync(resumeId);

        if (resume == null || resume.UserId != userId)
        {
            throw new NotFoundException("Resume not found.");
        }

        return MapToResponse(resume);
    }

    public async Task<ResumeDetailResponse> GetFullResumeAsync(
        Guid userId,
        int resumeId)
    {
        var resume = await _resumeRepository.GetByIdAsync(resumeId);

        if (resume == null || resume.UserId != userId)
        {
            throw new NotFoundException("Resume not found.");
        }

        var experiences = await _experienceRepository.GetByResumeIdAsync(resumeId);
        var educations = await _educationRepository.GetByResumeIdAsync(resumeId);
        var skills = await _skillRepository.GetByResumeIdAsync(resumeId);
        var projects = await _projectRepository.GetByResumeIdAsync(resumeId);
        var certificates = await _certificateRepository.GetByResumeIdAsync(resumeId);

        return new ResumeDetailResponse
        {
            Id = resume.Id,
            Title = resume.Title,
            FullName = resume.FullName,
            ProfessionalTitle = resume.ProfessionalTitle,
            Email = resume.Email,
            PhoneNumber = resume.PhoneNumber,
            Location = resume.Location,
            LinkedInUrl = resume.LinkedInUrl,
            GitHubUrl = resume.GitHubUrl,
            PortfolioUrl = resume.PortfolioUrl,
            TemplateId = resume.TemplateId,
            ThemeColorHex = resume.ThemeColorHex,
            Summary = resume.Summary,
            CreatedAt = resume.CreatedAt,
            Experiences = experiences.Select(e => new ExperienceResponse
            {
                Id = e.Id,
                CompanyName = e.CompanyName,
                Position = e.Position,
                Description = e.Description,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                IsCurrentJob = e.IsCurrentJob,
                ResumeId = e.ResumeId
            }).ToList(),
            Educations = educations.Select(ed => new EducationResponse
            {
                Id = ed.Id,
                InstituteName = ed.InstituteName,
                Degree = ed.Degree,
                FieldOfStudy = ed.FieldOfStudy,
                StartDate = ed.StartDate,
                EndDate = ed.EndDate,
                IsCurrentlyStudying = ed.IsCurrentlyStudying,
                ResumeId = ed.ResumeId
            }).ToList(),
            Skills = skills.Select(s => new SkillResponse
            {
                Id = s.Id,
                Name = s.Name,
                Level = s.Level,
                ResumeId = s.ResumeId
            }).ToList(),
            Projects = projects.Select(p => new ProjectResponse
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                TechnologiesUsed = p.TechnologiesUsed,
                GithubUrl = p.GithubUrl,
                LiveUrl = p.LiveUrl,
                ResumeId = p.ResumeId
            }).ToList(),
            Certificates = certificates.Select(c => new CertificateResponse
            {
                Id = c.Id,
                Name = c.Name,
                Issuer = c.Issuer,
                IssueDate = c.IssueDate,
                ResumeId = c.ResumeId
            }).ToList()
        };
    }

    public async Task<ResumeResponse> DuplicateResumeAsync(
        Guid userId,
        int resumeId)
    {
        var sourceResume = await _resumeRepository.GetByIdAsync(resumeId);

        if (sourceResume == null || sourceResume.UserId != userId)
        {
            throw new NotFoundException("Resume not found.");
        }

        var newResume = new Domain.Entities.Resume
        {
            Title = $"{sourceResume.Title} (Copy)",
            FullName = sourceResume.FullName,
            ProfessionalTitle = sourceResume.ProfessionalTitle,
            Email = sourceResume.Email,
            PhoneNumber = sourceResume.PhoneNumber,
            Location = sourceResume.Location,
            LinkedInUrl = sourceResume.LinkedInUrl,
            GitHubUrl = sourceResume.GitHubUrl,
            PortfolioUrl = sourceResume.PortfolioUrl,
            TemplateId = sourceResume.TemplateId,
            ThemeColorHex = sourceResume.ThemeColorHex,
            Summary = sourceResume.Summary,
            UserId = userId
        };

        await _resumeRepository.AddAsync(newResume);
        await _resumeRepository.SaveChangesAsync();

        var experiences = await _experienceRepository.GetByResumeIdAsync(resumeId);
        foreach (var exp in experiences)
        {
            await _experienceRepository.AddAsync(new Domain.Entities.Experience
            {
                CompanyName = exp.CompanyName,
                Position = exp.Position,
                Description = exp.Description,
                StartDate = exp.StartDate,
                EndDate = exp.EndDate,
                IsCurrentJob = exp.IsCurrentJob,
                ResumeId = newResume.Id
            });
        }

        var educations = await _educationRepository.GetByResumeIdAsync(resumeId);
        foreach (var edu in educations)
        {
            await _educationRepository.AddAsync(new Domain.Entities.Education
            {
                InstituteName = edu.InstituteName,
                Degree = edu.Degree,
                FieldOfStudy = edu.FieldOfStudy,
                StartDate = edu.StartDate,
                EndDate = edu.EndDate,
                IsCurrentlyStudying = edu.IsCurrentlyStudying,
                ResumeId = newResume.Id
            });
        }

        var skills = await _skillRepository.GetByResumeIdAsync(resumeId);
        foreach (var skill in skills)
        {
            await _skillRepository.AddAsync(new Domain.Entities.Skill
            {
                Name = skill.Name,
                Level = skill.Level,
                ResumeId = newResume.Id
            });
        }

        var projects = await _projectRepository.GetByResumeIdAsync(resumeId);
        foreach (var proj in projects)
        {
            await _projectRepository.AddAsync(new Domain.Entities.Project
            {
                Title = proj.Title,
                Description = proj.Description,
                TechnologiesUsed = proj.TechnologiesUsed,
                GithubUrl = proj.GithubUrl,
                LiveUrl = proj.LiveUrl,
                ResumeId = newResume.Id
            });
        }

        var certificates = await _certificateRepository.GetByResumeIdAsync(resumeId);
        foreach (var cert in certificates)
        {
            await _certificateRepository.AddAsync(new Domain.Entities.Certificate
            {
                Name = cert.Name,
                Issuer = cert.Issuer,
                IssueDate = cert.IssueDate,
                ResumeId = newResume.Id
            });
        }

        await _resumeRepository.SaveChangesAsync();

        return MapToResponse(newResume);
    }

    private static ResumeResponse MapToResponse(Domain.Entities.Resume x) => new ResumeResponse
    {
        Id = x.Id,
        Title = x.Title,
        FullName = x.FullName,
        ProfessionalTitle = x.ProfessionalTitle,
        Email = x.Email,
        PhoneNumber = x.PhoneNumber,
        Location = x.Location,
        LinkedInUrl = x.LinkedInUrl,
        GitHubUrl = x.GitHubUrl,
        PortfolioUrl = x.PortfolioUrl,
        TemplateId = x.TemplateId,
        ThemeColorHex = x.ThemeColorHex,
        Summary = x.Summary,
        CreatedAt = x.CreatedAt
    };

    public async Task<string> GenerateAiSummaryAsync(
        Guid userId,
        int resumeId)
    {
        var resumeExists = await _resumeRepository
            .ResumeBelongsToUserAsync(
                resumeId,
                userId);

        if (!resumeExists)
        {
            throw new NotFoundException(
     "Resume not found.");
        }

        var resumes = await _resumeRepository
            .GetUserResumesAsync(userId);

        var resume = resumes.First(x => x.Id == resumeId);

        var skills = await _skillRepository
            .GetByResumeIdAsync(resumeId);

        var projects = await _projectRepository
            .GetByResumeIdAsync(resumeId);

        var experiences = await _experienceRepository
            .GetByResumeIdAsync(resumeId);

        var prompt = $@"
Generate a professional ATS-friendly resume summary.

Skills:
{string.Join(", ", skills.Select(x => x.Name))}

Projects:
{string.Join(", ", projects.Select(x => x.Title))}

Experience:
{string.Join(", ", experiences.Select(x => x.Position))}
";

        var summary = await _aiService
            .GenerateSummaryAsync(prompt);

        resume.Summary = summary;

        await _resumeRepository.SaveChangesAsync();

        return summary;
    }

    public async Task UpdateAsync(
        Guid userId,
        int resumeId,
        UpdateResumeRequest request)
    {
        var resume = await _resumeRepository
            .GetByIdAsync(resumeId);

        if (resume == null ||
            resume.UserId != userId)
        {
            throw new NotFoundException(
     "Resume not found.");
        }

        resume.Title = request.Title;
        resume.FullName = request.FullName;
        resume.ProfessionalTitle = request.ProfessionalTitle;
        resume.Email = request.Email;
        resume.PhoneNumber = request.PhoneNumber;
        resume.Location = request.Location;
        resume.LinkedInUrl = request.LinkedInUrl;
        resume.GitHubUrl = request.GitHubUrl;
        resume.PortfolioUrl = request.PortfolioUrl;
        if (!string.IsNullOrWhiteSpace(request.TemplateId)) resume.TemplateId = request.TemplateId;
        if (!string.IsNullOrWhiteSpace(request.ThemeColorHex)) resume.ThemeColorHex = request.ThemeColorHex;
        resume.Summary = request.Summary;

        await _resumeRepository.SaveChangesAsync();
    }

    public async Task DeleteAsync(
        Guid userId,
        int resumeId)
    {
        var resume = await _resumeRepository.GetByIdAsync(resumeId);

        if (resume == null || resume.UserId != userId)
        {
            throw new NotFoundException("Resume not found.");
        }

        _resumeRepository.Delete(resume);
        await _resumeRepository.SaveChangesAsync();
    }

    public async Task<ResumeAnalysisResponse>
        AnalyzeResumeAsync(
            Guid userId,
            int resumeId)
    {
        var resumeExists = await _resumeRepository
            .ResumeBelongsToUserAsync(
                resumeId,
                userId);

        if (!resumeExists)
        {
            throw new NotFoundException(
    "Resume not found.");
        }

        var resumes = await _resumeRepository
            .GetUserResumesAsync(userId);

        var resume = resumes.First(x => x.Id == resumeId);

        var skills = await _skillRepository
            .GetByResumeIdAsync(resumeId);

        var projects = await _projectRepository
            .GetByResumeIdAsync(resumeId);

        var experiences = await _experienceRepository
            .GetByResumeIdAsync(resumeId);

        int score = 0;

        var feedback = new List<string>();

        // Summary
        if (!string.IsNullOrWhiteSpace(
            resume.Summary))
        {
            score += 25;
        }
        else
        {
            feedback.Add(
                "Add professional summary.");
        }

        // Skills
        if (skills.Count >= 5)
        {
            score += 25;
        }
        else
        {
            feedback.Add(
                "Add more technical skills.");
        }

        // Projects
        if (projects.Count >= 2)
        {
            score += 25;
        }
        else
        {
            feedback.Add(
                "Add more projects.");
        }

        // Experience
        if (experiences.Count >= 1)
        {
            score += 25;
        }
        else
        {
            feedback.Add(
                "Add work experience.");
        }

        var prompt = $@"
Analyze this resume and give ATS improvement suggestions.

Summary:
{resume.Summary}

Skills:
{string.Join(", ", skills.Select(x => x.Name))}

Projects:
{string.Join(", ", projects.Select(x => x.Title))}

Experience:
{string.Join(", ", experiences.Select(x => x.Position))}
";

        var aiSuggestions = await _aiService
            .AnalyzeResumeAsync(prompt);

        return new ResumeAnalysisResponse
        {
            Score = score,
            Feedback = feedback,
            AiSuggestions = aiSuggestions
        };
    }


    public async Task<JobMatchResponse>
     MatchJobAsync(
         Guid userId,
         JobMatchRequest request)
    {
        var resumeExists = await _resumeRepository
            .ResumeBelongsToUserAsync(
                request.ResumeId,
                userId);

        if (!resumeExists)
        {
            throw new NotFoundException(
    "Resume not found.");
        }

        var resumes = await _resumeRepository
            .GetUserResumesAsync(userId);

        var resume = resumes.First(
            x => x.Id == request.ResumeId);

        var skills = await _skillRepository
            .GetByResumeIdAsync(request.ResumeId);

        var projects = await _projectRepository
            .GetByResumeIdAsync(request.ResumeId);

        var experiences = await _experienceRepository
            .GetByResumeIdAsync(request.ResumeId);

        var prompt = $@"
Compare this resume with the job description.

Return ONLY valid JSON.

Format:
{{
  ""matchPercentage"": 0,
  ""missingSkills"": [],
  ""suggestions"": """"
}}

Resume Summary:
{resume.Summary}

Skills:
{string.Join(", ", skills.Select(x => x.Name))}

Projects:
{string.Join(", ", projects.Select(x => x.Title))}

Experience:
{string.Join(", ", experiences.Select(x => x.Position))}

Job Description:
{request.JobDescription}

IMPORTANT:
- Return ONLY JSON
- No markdown
- No explanations
";

        var aiResult = await _aiService
            .AnalyzeResumeAsync(prompt);

        aiResult = aiResult
    .Replace("```json", "")
    .Replace("```", "")
    .Trim();

        Console.WriteLine(aiResult);

        var result = System.Text.Json.JsonSerializer
            .Deserialize<JobMatchResponse>(
                aiResult,
                new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

        if (result == null)
        {
            throw new BadRequestException(
       "Failed to analyze job match.");
        }

        return result;
    }
}
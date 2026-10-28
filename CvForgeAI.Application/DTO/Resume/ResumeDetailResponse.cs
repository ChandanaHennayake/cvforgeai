using CvForgeAI.Application.DTO.Certificate;
using CvForgeAI.Application.DTO.Education;
using CvForgeAI.Application.DTO.Experience;
using CvForgeAI.Application.DTO.Project;
using CvForgeAI.Application.DTO.Skill;

namespace CvForgeAI.Application.DTO.Resume;

public class ResumeDetailResponse : ResumeResponse
{
    public List<ExperienceResponse> Experiences { get; set; } = new();
    public List<EducationResponse> Educations { get; set; } = new();
    public List<SkillResponse> Skills { get; set; } = new();
    public List<ProjectResponse> Projects { get; set; } = new();
    public List<CertificateResponse> Certificates { get; set; } = new();
}

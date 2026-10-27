namespace CvForgeAI.Domain.Entities;

public class Resume
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string FullName { get; set; } = string.Empty;

    public string ProfessionalTitle { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Location { get; set; } = string.Empty;

    public string LinkedInUrl { get; set; } = string.Empty;

    public string GitHubUrl { get; set; } = string.Empty;

    public string PortfolioUrl { get; set; } = string.Empty;

    public string TemplateId { get; set; } = "classic-ats";

    public string ThemeColorHex { get; set; } = "#4F46E5";

    public string Summary { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public ICollection<Experience> Experiences { get; set; }
        = new List<Experience>();

    public ICollection<Skill> Skills { get; set; }
    = new List<Skill>();

    public ICollection<Education> Educations { get; set; }
    = new List<Education>();

    public ICollection<Project> Projects { get; set; }
    = new List<Project>();

    public ICollection<Certificate> Certificates { get; set; }
    = new List<Certificate>();

}
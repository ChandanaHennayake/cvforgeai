namespace CvForgeAI.Application.DTO.Resume;

public class UpdateResumeRequest
{
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
}
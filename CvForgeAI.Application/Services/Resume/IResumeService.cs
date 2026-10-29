using CvForgeAI.Application.DTO.Resume;

namespace CvForgeAI.Application.Services.Resume;

public interface IResumeService
{
    Task<string> CreateAsync(
        Guid userId,
        CreateResumeRequest request);

    Task<List<ResumeResponse>> GetUserResumesAsync(
        Guid userId);

    Task<ResumeResponse> GetByIdAsync(
        Guid userId,
        int resumeId);

    Task<ResumeDetailResponse> GetFullResumeAsync(
        Guid userId,
        int resumeId);

    Task<ResumeResponse> DuplicateResumeAsync(
        Guid userId,
        int resumeId);

    Task<string> GenerateAiSummaryAsync(
        Guid userId,
        int resumeId);

    Task UpdateAsync(
        Guid userId,
        int resumeId,
        UpdateResumeRequest request);

    Task DeleteAsync(
        Guid userId,
        int resumeId);

    Task<ResumeAnalysisResponse> AnalyzeResumeAsync(
        Guid userId,
        int resumeId);

    Task<JobMatchResponse> MatchJobAsync(
        Guid userId,
        JobMatchRequest request);
}
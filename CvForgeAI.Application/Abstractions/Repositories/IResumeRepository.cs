using CvForgeAI.Domain.Entities;

namespace CvForgeAI.Application.Abstractions.Repositories;

public interface IResumeRepository
{
    Task AddAsync(Resume resume);

    Task<List<Resume>> GetUserResumesAsync(
        Guid userId);

    Task<bool> ResumeBelongsToUserAsync(
        int resumeId,
        Guid userId);

    Task SaveChangesAsync();

    Task<Resume?> GetByIdAsync(
        int resumeId);

    void Delete(Resume resume);
}
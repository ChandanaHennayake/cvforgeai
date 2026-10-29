using CvForgeAI.Domain.Entities;

namespace CvForgeAI.Application.Abstractions.Repositories;

public interface IExperienceRepository
{
    Task AddAsync(Experience experience);

    Task<List<Experience>> GetByResumeIdAsync(
        int resumeId);

    Task<Experience?> GetByIdAsync(int id);

    void Delete(Experience experience);

    Task SaveChangesAsync();
}
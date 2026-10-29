using CvForgeAI.Domain.Entities;

namespace CvForgeAI.Application.Abstractions.Repositories;

public interface IEducationRepository
{
    Task AddAsync(Education education);

    Task<List<Education>> GetByResumeIdAsync(
        int resumeId);

    Task<Education?> GetByIdAsync(int id);

    void Delete(Education education);

    Task SaveChangesAsync();
}
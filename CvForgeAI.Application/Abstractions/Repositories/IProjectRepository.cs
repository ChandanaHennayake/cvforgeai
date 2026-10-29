using CvForgeAI.Domain.Entities;

namespace CvForgeAI.Application.Abstractions.Repositories;

public interface IProjectRepository
{
    Task AddAsync(Project project);

    Task<List<Project>> GetByResumeIdAsync(
        int resumeId);

    Task<Project?> GetByIdAsync(int id);

    void Delete(Project project);

    Task SaveChangesAsync();
}
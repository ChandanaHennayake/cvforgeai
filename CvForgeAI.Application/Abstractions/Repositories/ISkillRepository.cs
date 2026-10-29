using CvForgeAI.Domain.Entities;

namespace CvForgeAI.Application.Abstractions.Repositories;

public interface ISkillRepository
{
    Task AddAsync(Skill skill);

    Task<List<Skill>> GetByResumeIdAsync(
        int resumeId);

    Task<Skill?> GetByIdAsync(int id);

    void Delete(Skill skill);

    Task SaveChangesAsync();
}
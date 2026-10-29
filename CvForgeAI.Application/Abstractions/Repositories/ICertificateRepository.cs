using CvForgeAI.Domain.Entities;

namespace CvForgeAI.Application.Abstractions.Repositories;

public interface ICertificateRepository
{
    Task AddAsync(Certificate certificate);

    Task<List<Certificate>> GetByResumeIdAsync(
        int resumeId);

    Task<Certificate?> GetByIdAsync(int id);

    void Delete(Certificate certificate);

    Task SaveChangesAsync();
}
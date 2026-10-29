using CvForgeAI.Application.Abstractions.Repositories;
using CvForgeAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CvForgeAI.Infrastructure.Persistence.Repositories;

public class CertificateRepository : ICertificateRepository
{
    private readonly AppDbContext _context;

    public CertificateRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Certificate certificate)
    {
        await _context.Certificates.AddAsync(certificate);
    }

    public async Task<List<Certificate>> GetByResumeIdAsync(
        int resumeId)
    {
        return await _context.Certificates
            .Where(x => x.ResumeId == resumeId)
            .ToListAsync();
    }

    public async Task<Certificate?> GetByIdAsync(int id)
    {
        return await _context.Certificates
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public void Delete(Certificate certificate)
    {
        _context.Certificates.Remove(certificate);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
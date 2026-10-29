using CvForgeAI.Application.Abstractions.Repositories;
using CvForgeAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CvForgeAI.Infrastructure.Persistence.Repositories;

public class EducationRepository : IEducationRepository
{
    private readonly AppDbContext _context;

    public EducationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Education education)
    {
        await _context.Educations.AddAsync(education);
    }

    public async Task<List<Education>> GetByResumeIdAsync(
        int resumeId)
    {
        return await _context.Educations
            .Where(x => x.ResumeId == resumeId)
            .ToListAsync();
    }

    public async Task<Education?> GetByIdAsync(int id)
    {
        return await _context.Educations
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public void Delete(Education education)
    {
        _context.Educations.Remove(education);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
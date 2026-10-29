using CvForgeAI.Application.Abstractions.Repositories;
using CvForgeAI.Application.DTO.Experience;
using CvForgeAI.Application.Exceptions;

namespace CvForgeAI.Application.Services.Experience;

public class ExperienceService : IExperienceService
{
    private readonly IExperienceRepository _experienceRepository;
    private readonly IResumeRepository _resumeRepository;

    public ExperienceService(
        IExperienceRepository experienceRepository,
        IResumeRepository resumeRepository)
    {
        _experienceRepository = experienceRepository;
        _resumeRepository = resumeRepository;
    }

    public async Task<ExperienceResponse> CreateAsync(
        Guid userId,
        CreateExperienceRequest request)
    {
        var resumeExists = await _resumeRepository
            .ResumeBelongsToUserAsync(
                request.ResumeId,
                userId);

        if (!resumeExists)
        {
            throw new NotFoundException("Resume not found.");
        }

        var experience = new Domain.Entities.Experience
        {
            CompanyName = request.CompanyName,
            Position = request.Position,
            Description = request.Description,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            IsCurrentJob = request.IsCurrentJob,
            ResumeId = request.ResumeId
        };

        await _experienceRepository.AddAsync(experience);
        await _experienceRepository.SaveChangesAsync();

        return new ExperienceResponse
        {
            Id = experience.Id,
            CompanyName = experience.CompanyName,
            Position = experience.Position,
            Description = experience.Description,
            StartDate = experience.StartDate,
            EndDate = experience.EndDate,
            IsCurrentJob = experience.IsCurrentJob,
            ResumeId = experience.ResumeId
        };
    }

    public async Task<List<ExperienceResponse>> GetResumeExperiencesAsync(
        Guid userId,
        int resumeId)
    {
        var resumeExists = await _resumeRepository
            .ResumeBelongsToUserAsync(
                resumeId,
                userId);

        if (!resumeExists)
        {
            throw new NotFoundException("Resume not found.");
        }

        var experiences = await _experienceRepository
            .GetByResumeIdAsync(resumeId);

        return experiences.Select(x => new ExperienceResponse
        {
            Id = x.Id,
            CompanyName = x.CompanyName,
            Position = x.Position,
            Description = x.Description,
            StartDate = x.StartDate,
            EndDate = x.EndDate,
            IsCurrentJob = x.IsCurrentJob,
            ResumeId = x.ResumeId
        }).ToList();
    }

    public async Task UpdateAsync(
        Guid userId,
        int experienceId,
        UpdateExperienceRequest request)
    {
        var experience = await _experienceRepository.GetByIdAsync(experienceId);
        if (experience == null)
        {
            throw new NotFoundException("Experience not found.");
        }

        var ownsResume = await _resumeRepository.ResumeBelongsToUserAsync(experience.ResumeId, userId);
        if (!ownsResume)
        {
            throw new NotFoundException("Experience not found.");
        }

        experience.CompanyName = request.CompanyName;
        experience.Position = request.Position;
        experience.Description = request.Description;
        experience.StartDate = request.StartDate;
        experience.EndDate = request.EndDate;
        experience.IsCurrentJob = request.IsCurrentJob;

        await _experienceRepository.SaveChangesAsync();
    }

    public async Task DeleteAsync(
        Guid userId,
        int experienceId)
    {
        var experience = await _experienceRepository.GetByIdAsync(experienceId);
        if (experience == null)
        {
            throw new NotFoundException("Experience not found.");
        }

        var ownsResume = await _resumeRepository.ResumeBelongsToUserAsync(experience.ResumeId, userId);
        if (!ownsResume)
        {
            throw new NotFoundException("Experience not found.");
        }

        _experienceRepository.Delete(experience);
        await _experienceRepository.SaveChangesAsync();
    }
}
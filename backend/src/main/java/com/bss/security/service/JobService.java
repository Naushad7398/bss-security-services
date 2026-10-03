package com.bss.security.service;

import com.bss.security.dto.request.CreateJobRequest;
import com.bss.security.dto.request.UpdateJobRequest;
import com.bss.security.dto.response.JobResponse;
import com.bss.security.entity.Job;
import com.bss.security.entity.JobStatus;
import com.bss.security.exception.ResourceNotFoundException;
import com.bss.security.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Transactional(readOnly = true)
    public List<JobResponse> getPublishedJobs() {
        return jobRepository.findByStatusOrderByCreatedAtDesc(JobStatus.PUBLISHED)
                .stream()
                .map(JobResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public JobResponse getPublishedJobById(Long id) {
        Job job = jobRepository.findByIdAndStatus(id, JobStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Published job not found with id: " + id));
        return JobResponse.fromEntity(job);
    }

    @Transactional(readOnly = true)
    public List<JobResponse> getAllJobsForAdmin() {
        return jobRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(JobResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return JobResponse.fromEntity(job);
    }

    @Transactional
    public JobResponse createJob(CreateJobRequest request) {
        Job job = new Job();
        job.setTitle(request.getTitle().trim());
        job.setDepartment(request.getDepartment().trim());
        job.setLocation(request.getLocation().trim());
        job.setEmploymentType(request.getEmploymentType().trim());
        job.setExperience(request.getExperience().trim());
        job.setSalaryRange(request.getSalaryRange() != null ? request.getSalaryRange().trim() : null);
        job.setDescription(request.getDescription().trim());
        job.setResponsibilities(request.getResponsibilities().trim());
        job.setRequirements(request.getRequirements().trim());
        job.setSkills(request.getSkills().trim());
        job.setDeadline(request.getDeadline());
        job.setStatus(request.getStatus() != null ? request.getStatus() : JobStatus.DRAFT);

        Job savedJob = jobRepository.save(job);
        return JobResponse.fromEntity(savedJob);
    }

    @Transactional
    public JobResponse updateJob(Long id, UpdateJobRequest request) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        job.setTitle(request.getTitle().trim());
        job.setDepartment(request.getDepartment().trim());
        job.setLocation(request.getLocation().trim());
        job.setEmploymentType(request.getEmploymentType().trim());
        job.setExperience(request.getExperience().trim());
        job.setSalaryRange(request.getSalaryRange() != null ? request.getSalaryRange().trim() : null);
        job.setDescription(request.getDescription().trim());
        job.setResponsibilities(request.getResponsibilities().trim());
        job.setRequirements(request.getRequirements().trim());
        job.setSkills(request.getSkills().trim());
        job.setDeadline(request.getDeadline());
        job.setStatus(request.getStatus());

        Job updatedJob = jobRepository.save(job);
        return JobResponse.fromEntity(updatedJob);
    }

    @Transactional
    public JobResponse updateJobStatus(Long id, JobStatus newStatus) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        job.setStatus(newStatus);
        Job updatedJob = jobRepository.save(job);
        return JobResponse.fromEntity(updatedJob);
    }

    @Transactional
    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        jobRepository.delete(job);
    }
}

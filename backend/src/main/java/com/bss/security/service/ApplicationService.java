package com.bss.security.service;

import com.bss.security.dto.request.CreateApplicationRequest;
import com.bss.security.dto.response.ApplicationResponse;
import com.bss.security.entity.*;
import com.bss.security.exception.BadRequestException;
import com.bss.security.exception.DuplicateResourceException;
import com.bss.security.exception.ResourceNotFoundException;
import com.bss.security.repository.ApplicationRepository;
import com.bss.security.repository.JobRepository;
import com.bss.security.repository.UserRepository;
import com.bss.security.security.UserPrincipal;
import org.springframework.core.io.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobRepository jobRepository,
                              UserRepository userRepository,
                              FileStorageService fileStorageService) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public ApplicationResponse applyForJob(Long jobId, CreateApplicationRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (user.getRole() != Role.APPLICANT) {
            throw new AccessDeniedException("Only applicants can submit job applications");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        if (job.getStatus() != JobStatus.PUBLISHED) {
            throw new BadRequestException("Applications are only accepted for PUBLISHED jobs. Current job status: " + job.getStatus());
        }

        if (applicationRepository.existsByUserIdAndJobId(userId, jobId)) {
            throw new DuplicateResourceException("You have already applied for this job position: " + job.getTitle());
        }

        // Store the resume securely
        String storedFileName = fileStorageService.storeResume(request.getResume());

        Application application = new Application(
                job,
                user,
                request.getFullName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getPhone().trim(),
                request.getEducation().trim(),
                request.getExperience().trim(),
                request.getSkills() != null ? request.getSkills().trim() : null,
                request.getCoverLetter() != null ? request.getCoverLetter().trim() : null,
                storedFileName,
                ApplicationStatus.APPLIED
        );

        Application savedApplication = applicationRepository.save(application);
        return ApplicationResponse.fromEntity(savedApplication);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getMyApplications(Long userId) {
        return applicationRepository.findByUserIdOrderByAppliedAtDesc(userId)
                .stream()
                .map(ApplicationResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public ApplicationResponse getMyApplicationById(Long applicationId, Long userId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));

        if (!application.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Access denied: you do not have permission to view this application");
        }

        return ApplicationResponse.fromEntity(application);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getAllApplicationsForAdmin() {
        return applicationRepository.findAllByOrderByAppliedAtDesc()
                .stream()
                .map(ApplicationResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public ApplicationResponse getApplicationByIdForAdmin(Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));
        return ApplicationResponse.fromEntity(application);
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus newStatus) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));

        application.setStatus(newStatus);
        Application updated = applicationRepository.save(application);
        return ApplicationResponse.fromEntity(updated);
    }

    @Transactional(readOnly = true)
    public Resource getResumeForDownload(Long applicationId, UserPrincipal currentUser) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));

        boolean isAdmin = currentUser.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !application.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access denied: you do not have permission to download this resume");
        }

        return fileStorageService.loadResumeAsResource(application.getResumePath());
    }

    @Transactional(readOnly = true)
    public String getResumeFileName(Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));
        String extension = "";
        int dot = application.getResumePath().lastIndexOf(".");
        if (dot != -1) {
            extension = application.getResumePath().substring(dot);
        }
        return "Resume_" + application.getFullName().replaceAll("[^a-zA-Z0-9]", "_") + extension;
    }
}

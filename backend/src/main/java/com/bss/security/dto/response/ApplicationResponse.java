package com.bss.security.dto.response;

import com.bss.security.entity.Application;
import com.bss.security.entity.ApplicationStatus;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long id;
    private Long jobId;
    private String jobTitle;
    private String department;
    private Long userId;
    private String applicantName;
    private String email;
    private String phone;
    private String education;
    private String experience;
    private String skills;
    private String coverLetter;
    private boolean hasResume;
    private String resumeDownloadUrl;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;

    public ApplicationResponse() {
    }

    public ApplicationResponse(Long id, Long jobId, String jobTitle, String department,
                               Long userId, String applicantName, String email, String phone,
                               String education, String experience, String skills,
                               String coverLetter, boolean hasResume, String resumeDownloadUrl,
                               ApplicationStatus status, LocalDateTime appliedAt,
                               LocalDateTime updatedAt) {
        this.id = id;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.department = department;
        this.userId = userId;
        this.applicantName = applicantName;
        this.email = email;
        this.phone = phone;
        this.education = education;
        this.experience = experience;
        this.skills = skills;
        this.coverLetter = coverLetter;
        this.hasResume = hasResume;
        this.resumeDownloadUrl = resumeDownloadUrl;
        this.status = status;
        this.appliedAt = appliedAt;
        this.updatedAt = updatedAt;
    }

    public static ApplicationResponse fromEntity(Application application) {
        boolean hasResume = application.getResumePath() != null && !application.getResumePath().trim().isEmpty();
        String resumeUrl = hasResume ? "/api/applications/" + application.getId() + "/resume" : null;

        return new ApplicationResponse(
                application.getId(),
                application.getJob() != null ? application.getJob().getId() : null,
                application.getJob() != null ? application.getJob().getTitle() : null,
                application.getJob() != null ? application.getJob().getDepartment() : null,
                application.getUser() != null ? application.getUser().getId() : null,
                application.getFullName(),
                application.getEmail(),
                application.getPhone(),
                application.getEducation(),
                application.getExperience(),
                application.getSkills(),
                application.getCoverLetter(),
                hasResume,
                resumeUrl,
                application.getStatus(),
                application.getAppliedAt(),
                application.getUpdatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public boolean isHasResume() {
        return hasResume;
    }

    public void setHasResume(boolean hasResume) {
        this.hasResume = hasResume;
    }

    public String getResumeDownloadUrl() {
        return resumeDownloadUrl;
    }

    public void setResumeDownloadUrl(String resumeDownloadUrl) {
        this.resumeDownloadUrl = resumeDownloadUrl;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

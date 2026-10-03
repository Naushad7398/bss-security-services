package com.bss.security.dto.response;

import com.bss.security.entity.Job;
import com.bss.security.entity.JobStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class JobResponse {

    private Long id;
    private String title;
    private String department;
    private String location;
    private String employmentType;
    private String experience;
    private String salaryRange;
    private String description;
    private String responsibilities;
    private String requirements;
    private String skills;
    private LocalDate deadline;
    private JobStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public JobResponse() {
    }

    public JobResponse(Long id, String title, String department, String location,
                       String employmentType, String experience, String salaryRange,
                       String description, String responsibilities, String requirements,
                       String skills, LocalDate deadline, JobStatus status,
                       LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.department = department;
        this.location = location;
        this.employmentType = employmentType;
        this.experience = experience;
        this.salaryRange = salaryRange;
        this.description = description;
        this.responsibilities = responsibilities;
        this.requirements = requirements;
        this.skills = skills;
        this.deadline = deadline;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static JobResponse fromEntity(Job job) {
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDepartment(),
                job.getLocation(),
                job.getEmploymentType(),
                job.getExperience(),
                job.getSalaryRange(),
                job.getDescription(),
                job.getResponsibilities(),
                job.getRequirements(),
                job.getSkills(),
                job.getDeadline(),
                job.getStatus(),
                job.getCreatedAt(),
                job.getUpdatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getSalaryRange() {
        return salaryRange;
    }

    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(String responsibilities) {
        this.responsibilities = responsibilities;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

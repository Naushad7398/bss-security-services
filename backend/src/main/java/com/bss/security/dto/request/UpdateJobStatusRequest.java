package com.bss.security.dto.request;

import com.bss.security.entity.JobStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateJobStatusRequest {

    @NotNull(message = "Job status is required")
    private JobStatus status;

    public UpdateJobStatusRequest() {
    }

    public UpdateJobStatusRequest(JobStatus status) {
        this.status = status;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }
}

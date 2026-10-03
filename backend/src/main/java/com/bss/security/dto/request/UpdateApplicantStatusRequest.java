package com.bss.security.dto.request;

import jakarta.validation.constraints.NotNull;

public class UpdateApplicantStatusRequest {

    @NotNull(message = "Account enabled status is required")
    private Boolean enabled;

    public UpdateApplicantStatusRequest() {
    }

    public UpdateApplicantStatusRequest(Boolean enabled) {
        this.enabled = enabled;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}

package com.bss.security.dto.request;

import com.bss.security.entity.QueryStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateContactQueryStatusRequest {

    @NotNull(message = "Query status is required")
    private QueryStatus status;

    public UpdateContactQueryStatusRequest() {
    }

    public UpdateContactQueryStatusRequest(QueryStatus status) {
        this.status = status;
    }

    public QueryStatus getStatus() {
        return status;
    }

    public void setStatus(QueryStatus status) {
        this.status = status;
    }
}

package com.bss.security.dto.response;

import com.bss.security.entity.ContactQuery;
import com.bss.security.entity.QueryStatus;

import java.time.LocalDateTime;

public class ContactQueryResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String service;
    private String message;
    private QueryStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ContactQueryResponse() {
    }

    public ContactQueryResponse(Long id, String name, String email, String phone, String service,
                                String message, QueryStatus status, LocalDateTime createdAt,
                                LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ContactQueryResponse fromEntity(ContactQuery entity) {
        if (entity == null) {
            return null;
        }
        return new ContactQueryResponse(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getService(),
                entity.getMessage(),
                entity.getStatus(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public QueryStatus getStatus() {
        return status;
    }

    public void setStatus(QueryStatus status) {
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

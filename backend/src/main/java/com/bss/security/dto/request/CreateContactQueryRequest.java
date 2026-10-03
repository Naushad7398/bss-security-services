package com.bss.security.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateContactQueryRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 120, message = "Email must not exceed 120 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Size(max = 25, message = "Phone number must not exceed 25 characters")
    private String phone;

    @Size(max = 100, message = "Service name must not exceed 100 characters")
    private String service;

    @NotBlank(message = "Message is required")
    @Size(max = 3000, message = "Message must not exceed 3000 characters")
    private String message;

    public CreateContactQueryRequest() {
    }

    public CreateContactQueryRequest(String name, String email, String phone, String service, String message) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.message = message;
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
}

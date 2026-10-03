package com.bss.security.controller;

import com.bss.security.dto.request.UpdateApplicantStatusRequest;
import com.bss.security.dto.response.ApplicantResponse;
import com.bss.security.service.ApplicantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/applicants")
@PreAuthorize("hasRole('ADMIN')")
public class AdminApplicantController {

    private final ApplicantService applicantService;

    public AdminApplicantController(ApplicantService applicantService) {
        this.applicantService = applicantService;
    }

    @GetMapping
    public ResponseEntity<List<ApplicantResponse>> getAllApplicants(
            @RequestParam(required = false) String search) {
        List<ApplicantResponse> applicants = applicantService.getAllApplicants(search);
        return ResponseEntity.ok(applicants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicantResponse> getApplicantById(@PathVariable Long id) {
        ApplicantResponse response = applicantService.getApplicantById(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicantResponse> updateApplicantStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateApplicantStatusRequest request) {
        ApplicantResponse response = applicantService.updateApplicantStatus(id, request.getEnabled());
        return ResponseEntity.ok(response);
    }
}

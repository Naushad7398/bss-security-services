package com.bss.security.controller;

import com.bss.security.dto.request.CreateApplicationRequest;
import com.bss.security.dto.response.ApplicationResponse;
import com.bss.security.security.UserPrincipal;
import com.bss.security.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping(value = "/api/jobs/{jobId}/apply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('APPLICANT')")
    public ResponseEntity<ApplicationResponse> applyForJob(
            @PathVariable Long jobId,
            @Valid @ModelAttribute CreateApplicationRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        ApplicationResponse response = applicationService.applyForJob(jobId, request, currentUser.getId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/api/applications/my")
    @PreAuthorize("hasRole('APPLICANT')")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(
            @AuthenticationPrincipal UserPrincipal currentUser) {

        List<ApplicationResponse> applications = applicationService.getMyApplications(currentUser.getId());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/api/applications/my/{id}")
    @PreAuthorize("hasRole('APPLICANT')")
    public ResponseEntity<ApplicationResponse> getMyApplicationById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        ApplicationResponse response = applicationService.getMyApplicationById(id, currentUser.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/applications/{id}/resume")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Resource resource = applicationService.getResumeForDownload(id, currentUser);
        String downloadFileName = applicationService.getResumeFileName(id);

        String contentType = "application/octet-stream";
        try {
            String probeContentType = Files.probeContentType(Paths.get(resource.getFile().getAbsolutePath()));
            if (probeContentType != null) {
                contentType = probeContentType;
            }
        } catch (IOException ignored) {
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + downloadFileName + "\"")
                .body(resource);
    }
}

package com.bss.security.controller;

import com.bss.security.dto.response.JobResponse;
import com.bss.security.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobResponse>> getPublishedJobs() {
        List<JobResponse> jobs = jobService.getPublishedJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getPublishedJobById(@PathVariable Long id) {
        JobResponse job = jobService.getPublishedJobById(id);
        return ResponseEntity.ok(job);
    }
}

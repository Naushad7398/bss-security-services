package com.bss.security.controller;

import com.bss.security.dto.request.UpdateContactQueryStatusRequest;
import com.bss.security.dto.response.ContactQueryResponse;
import com.bss.security.service.ContactQueryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/contact-queries")
@PreAuthorize("hasRole('ADMIN')")
public class AdminContactQueryController {

    private final ContactQueryService contactQueryService;

    public AdminContactQueryController(ContactQueryService contactQueryService) {
        this.contactQueryService = contactQueryService;
    }

    @GetMapping
    public ResponseEntity<List<ContactQueryResponse>> getAllContactQueries() {
        List<ContactQueryResponse> queries = contactQueryService.getAllContactQueriesForAdmin();
        return ResponseEntity.ok(queries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactQueryResponse> getContactQueryById(@PathVariable Long id) {
        ContactQueryResponse response = contactQueryService.getContactQueryByIdForAdmin(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ContactQueryResponse> updateContactQueryStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateContactQueryStatusRequest request) {

        ContactQueryResponse response = contactQueryService.updateContactQueryStatus(id, request.getStatus());
        return ResponseEntity.ok(response);
    }
}

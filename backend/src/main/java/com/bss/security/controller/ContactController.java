package com.bss.security.controller;

import com.bss.security.dto.request.CreateContactQueryRequest;
import com.bss.security.dto.response.ContactQueryResponse;
import com.bss.security.service.ContactQueryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactQueryService contactQueryService;

    public ContactController(ContactQueryService contactQueryService) {
        this.contactQueryService = contactQueryService;
    }

    @PostMapping
    public ResponseEntity<ContactQueryResponse> submitContactQuery(
            @Valid @RequestBody CreateContactQueryRequest request) {

        ContactQueryResponse response = contactQueryService.createContactQuery(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}

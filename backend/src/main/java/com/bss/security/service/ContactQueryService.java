package com.bss.security.service;

import com.bss.security.dto.request.CreateContactQueryRequest;
import com.bss.security.dto.response.ContactQueryResponse;
import com.bss.security.entity.ContactQuery;
import com.bss.security.entity.QueryStatus;
import com.bss.security.exception.BadRequestException;
import com.bss.security.exception.ResourceNotFoundException;
import com.bss.security.repository.ContactQueryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactQueryService {

    private final ContactQueryRepository contactQueryRepository;

    public ContactQueryService(ContactQueryRepository contactQueryRepository) {
        this.contactQueryRepository = contactQueryRepository;
    }

    /**
     * Submit a new public contact query.
     * Default status is always NEW.
     */
    @Transactional
    public ContactQueryResponse createContactQuery(CreateContactQueryRequest request) {
        ContactQuery query = new ContactQuery(
                request.getName().trim(),
                request.getEmail().trim(),
                request.getPhone().trim(),
                request.getService() != null ? request.getService().trim() : null,
                request.getMessage().trim()
        );
        // Explicitly enforce initial status
        query.setStatus(QueryStatus.NEW);

        ContactQuery saved = contactQueryRepository.save(query);
        return ContactQueryResponse.fromEntity(saved);
    }

    /**
     * Retrieve all contact queries ordered newest first (Admin only).
     */
    @Transactional(readOnly = true)
    public List<ContactQueryResponse> getAllContactQueriesForAdmin() {
        return contactQueryRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(ContactQueryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Retrieve single contact query by ID (Admin only).
     */
    @Transactional(readOnly = true)
    public ContactQueryResponse getContactQueryByIdForAdmin(Long id) {
        ContactQuery query = contactQueryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact query not found with id: " + id));
        return ContactQueryResponse.fromEntity(query);
    }

    /**
     * Update the operational status of a contact query (Admin only).
     */
    @Transactional
    public ContactQueryResponse updateContactQueryStatus(Long id, QueryStatus status) {
        if (status == null) {
            throw new BadRequestException("Query status cannot be null");
        }

        ContactQuery query = contactQueryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact query not found with id: " + id));

        query.setStatus(status);
        ContactQuery updated = contactQueryRepository.save(query);
        return ContactQueryResponse.fromEntity(updated);
    }
}

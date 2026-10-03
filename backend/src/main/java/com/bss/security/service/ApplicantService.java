package com.bss.security.service;

import com.bss.security.dto.response.ApplicantResponse;
import com.bss.security.entity.Role;
import com.bss.security.entity.User;
import com.bss.security.exception.ResourceNotFoundException;
import com.bss.security.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicantService {

    private final UserRepository userRepository;

    public ApplicantService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieve all users with APPLICANT role, newest first.
     * Supports optional search query across name, email, and phone.
     */
    @Transactional(readOnly = true)
    public List<ApplicantResponse> getAllApplicants(String search) {
        List<User> applicants = userRepository.findByRoleOrderByCreatedAtDesc(Role.APPLICANT);

        if (search != null && !search.trim().isEmpty()) {
            String q = search.trim().toLowerCase();
            applicants = applicants.stream()
                    .filter(u -> (u.getFullName() != null && u.getFullName().toLowerCase().contains(q))
                            || (u.getEmail() != null && u.getEmail().toLowerCase().contains(q))
                            || (u.getPhone() != null && u.getPhone().toLowerCase().contains(q)))
                    .collect(Collectors.toList());
        }

        return applicants.stream()
                .map(ApplicantResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Retrieve single applicant profile by ID.
     * Verifies that the user role is strictly APPLICANT; returns 404 for non-applicants.
     */
    @Transactional(readOnly = true)
    public ApplicantResponse getApplicantById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Applicant not found with id: " + id));

        if (user.getRole() != Role.APPLICANT) {
            throw new ResourceNotFoundException("Applicant not found with id: " + id);
        }

        return ApplicantResponse.fromEntity(user);
    }

    /**
     * Update account status (enabled / disabled) for an applicant.
     */
    @Transactional
    public ApplicantResponse updateApplicantStatus(Long id, boolean enabled) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Applicant not found with id: " + id));

        if (user.getRole() != Role.APPLICANT) {
            throw new ResourceNotFoundException("Applicant not found with id: " + id);
        }

        user.setEnabled(enabled);
        User updated = userRepository.save(user);
        return ApplicantResponse.fromEntity(updated);
    }
}

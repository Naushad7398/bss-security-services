package com.bss.security.repository;

import com.bss.security.entity.Application;
import com.bss.security.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByUserIdAndJobId(Long userId, Long jobId);

    List<Application> findByUserId(Long userId);

    List<Application> findByUserIdOrderByAppliedAtDesc(Long userId);

    Optional<Application> findByIdAndUserId(Long id, Long userId);

    List<Application> findAllByOrderByAppliedAtDesc();

    List<Application> findByJobIdOrderByAppliedAtDesc(Long jobId);

    List<Application> findByStatusOrderByAppliedAtDesc(ApplicationStatus status);

    long countByStatus(ApplicationStatus status);
}

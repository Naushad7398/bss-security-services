package com.bss.security.repository;

import com.bss.security.entity.Job;
import com.bss.security.entity.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByStatus(JobStatus status);

    List<Job> findByStatusOrderByCreatedAtDesc(JobStatus status);

    Optional<Job> findByIdAndStatus(Long id, JobStatus status);

    List<Job> findAllByOrderByCreatedAtDesc();

    long countByStatus(JobStatus status);
}

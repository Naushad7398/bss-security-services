package com.bss.security.repository;

import com.bss.security.entity.LoginActivity;
import com.bss.security.entity.LoginStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoginActivityRepository extends JpaRepository<LoginActivity, Long> {

    List<LoginActivity> findAllByOrderByTimestampDesc();

    List<LoginActivity> findByUserIdOrderByTimestampDesc(Long userId);

    long countByTimestampAfter(LocalDateTime timestamp);

    long countByStatus(LoginStatus status);
}

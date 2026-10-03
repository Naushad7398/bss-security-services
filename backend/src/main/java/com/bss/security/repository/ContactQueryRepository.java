package com.bss.security.repository;

import com.bss.security.entity.ContactQuery;
import com.bss.security.entity.QueryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactQueryRepository extends JpaRepository<ContactQuery, Long> {

    List<ContactQuery> findAllByOrderByCreatedAtDesc();

    List<ContactQuery> findByStatusOrderByCreatedAtDesc(QueryStatus status);

    long countByStatus(QueryStatus status);
}

package com.borovyknt.projectnetworktechnologies.infrastructure.repository;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.LoanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {
}

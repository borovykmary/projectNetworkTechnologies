package com.borovyknt.projectnetworktechnologies.infrastructure.repository;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.LoanEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {
    List<LoanEntity> findByUserAndBook(UserEntity user, BookEntity book);
    List<LoanEntity> findAllByUser_UserId(int userId);
}

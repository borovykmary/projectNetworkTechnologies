package com.borovyknt.projectnetworktechnologies.infrastructure.repository;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookDetailEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookDetailRepository extends JpaRepository<BookDetailEntity, Long> {
    Optional<BookDetailEntity> findByBookId(int id);
}

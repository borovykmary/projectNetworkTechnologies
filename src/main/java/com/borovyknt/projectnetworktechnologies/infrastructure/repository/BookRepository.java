package com.borovyknt.projectnetworktechnologies.infrastructure.repository;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    List<BookEntity> findByTitleOrAuthor(String title, String author);
    Optional<BookEntity> findByIsbn(String isbn);

}

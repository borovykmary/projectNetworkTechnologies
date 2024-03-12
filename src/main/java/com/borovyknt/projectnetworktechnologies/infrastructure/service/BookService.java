package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookEntity> getAll(){
        return bookRepository.findAll();
    }
}
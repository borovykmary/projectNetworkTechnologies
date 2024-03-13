package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookDetailEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookDetailService {
    private final BookDetailRepository bookDetailRepository;

    @Autowired
    public BookDetailService(BookDetailRepository bookDetailRepository) {
        this.bookDetailRepository = bookDetailRepository;
    }

    public BookDetailEntity getOne(long id){
        return bookDetailRepository.findById(id).orElseThrow(() -> new RuntimeException("Book detail not found"));
    }

    public List<BookDetailEntity> getAll(){
        return bookDetailRepository.findAll();
    }

    public BookDetailEntity create(BookDetailEntity bookDetail){
        return bookDetailRepository.save(bookDetail);
    }

    public void delete(long id){
        if(bookDetailRepository.existsById(id)) {
            bookDetailRepository.deleteById(id);
        } else {
            throw new RuntimeException("Book detail not found");
        }
    }
}


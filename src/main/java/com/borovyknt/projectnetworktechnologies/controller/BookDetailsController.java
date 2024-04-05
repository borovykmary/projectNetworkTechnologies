package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookDetailEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.BookDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book-details")
public class BookDetailsController {
    private final BookDetailService bookDetailService;

    @Autowired
    public BookDetailsController(BookDetailService bookDetailService) {
        this.bookDetailService = bookDetailService;
    }

    @GetMapping
    public List<BookDetailEntity> getAllBookDetails(){
        return bookDetailService.getAll();
    }

    @GetMapping("/{id}")
    public BookDetailEntity getOne(@PathVariable long id){
        return bookDetailService.getOne(id);
    }

    @PostMapping
    public BookDetailEntity create(@RequestBody BookDetailEntity bookDetail){
        return bookDetailService.create(bookDetail);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){
        bookDetailService.delete(id);
    }
}

package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.infrastructure.service.BookDetailService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book-details")
public class BookDetailsController {
    private final BookDetailService bookDetailService;

    @Autowired
    public BookDetailsController(BookDetailService bookDetailService) {
        this.bookDetailService = bookDetailService;
    }
    @GetMapping
    String getAll(){
        return "Mock all";
    }
}

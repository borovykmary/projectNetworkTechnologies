package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.controller.dto.book.CreateBookDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.book.CreateBookResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.book.GetBookDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BooksController {
    private final BookService bookService;

    @Autowired
    public BooksController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<GetBookDto> getAllBooks(){
        return bookService.getAll();
    }

    @GetMapping("/{id}")
    public GetBookDto getOne(@PathVariable String id){
        var idInt = Integer.parseInt(id);
        return bookService.getOne(idInt);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateBookResponseDto> create(@RequestBody CreateBookDto book){
        var newBook = bookService.create(book);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id){
        var idLong = Long.parseLong(id.substring(1, id.length() - 1));
        bookService.delete(idLong);
        return ResponseEntity.noContent().build();
    }
}

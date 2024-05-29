package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails.CreateBookDetailsDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails.CreateResponseBookDetailsDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails.GetBookDetailsDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookDetailEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.BookDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public List<GetBookDetailsDto> getAllBookDetails(){
        return bookDetailService.getAll();
    }

    @GetMapping("/{id}")
    public GetBookDetailsDto getOne(@PathVariable String id){
        var idInt = Integer.parseInt(id);
        return bookDetailService.getOne(idInt);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateResponseBookDetailsDto> create(@RequestBody CreateBookDetailsDto bookDetailDto){
        var newBookDetail = bookDetailService.create(bookDetailDto);
        return new ResponseEntity<>(newBookDetail, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable String id){
        var idLong = Long.parseLong(id.substring(1, id.length() - 1));
        bookDetailService.delete(idLong);
    }
}

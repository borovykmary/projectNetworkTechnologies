package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails.CreateBookDetailsDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails.CreateResponseBookDetailsDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails.GetBookDetailsDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookDetailEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookDetailRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookDetailService {
    private final BookDetailRepository bookDetailRepository;
    private final BookRepository bookRepository;

    @Autowired
    public BookDetailService(BookDetailRepository bookDetailRepository, BookRepository bookRepository) {
        this.bookDetailRepository = bookDetailRepository;
        this.bookRepository = bookRepository;
    }

    public GetBookDetailsDto getOne(int id){
        var bookDetailsEntity = bookDetailRepository.findByBookId(id).orElseThrow(() -> NotFoundException.create("Book Detail", id));
        return new GetBookDetailsDto(
                bookDetailsEntity.getBook().getId(),
                bookDetailsEntity.getGenre(),
                bookDetailsEntity.getSummary(),
                bookDetailsEntity.getCoverImageUrl()
        );
    }

    public List<GetBookDetailsDto> getAll(){
        var bookDetails = bookDetailRepository.findAll();
        return bookDetails.stream().map((bookDetail) -> new GetBookDetailsDto(
                bookDetail.getBook().getId(),
                bookDetail.getGenre(),
                bookDetail.getSummary(),
                bookDetail.getCoverImageUrl()
        )).toList();
    }

    public CreateResponseBookDetailsDto create(CreateBookDetailsDto bookDetailDto){
        BookEntity book = bookRepository.findById(bookDetailDto.getBookId()).orElseThrow(()
                -> new RuntimeException("Book with id " + bookDetailDto.getBookId() + " not found"));

        if (bookDetailRepository.findByBookId(bookDetailDto.getBookId()).isPresent()) {
            throw new RuntimeException("Book detail for book with id " + bookDetailDto.getBookId() + " already exists");
        }

        BookDetailEntity bookDetail = new BookDetailEntity();
        bookDetail.setGenre(bookDetailDto.getGenre());
        bookDetail.setSummary(bookDetailDto.getSummary());
        bookDetail.setCoverImageUrl(bookDetailDto.getCoverImageUrl());
        bookDetail.setBook(book);

        var newBookDetail = bookDetailRepository.save(bookDetail);

        return new CreateResponseBookDetailsDto(
                newBookDetail.getBook().getId(),
                newBookDetail.getGenre(),
                newBookDetail.getSummary(),
                newBookDetail.getCoverImageUrl()
        );
    }

    public void delete(long id){
        if(bookDetailRepository.existsById(id)) {
            bookDetailRepository.deleteById(id);
        } else {
            throw NotFoundException.create("Book Detail", id);
        }
    }
}


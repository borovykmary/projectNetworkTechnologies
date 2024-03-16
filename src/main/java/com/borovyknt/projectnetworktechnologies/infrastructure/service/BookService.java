package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.controller.dto.book.CreateBookDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.book.CreateBookResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.book.GetBookDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public GetBookDto getOne(long id){
        var bookEntity = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        return new GetBookDto(
                bookEntity.getId(),
                bookEntity.getIsbn(),
                bookEntity.getTitle(),
                bookEntity.getAuthor(),
                bookEntity.getPublisher(),
                bookEntity.getYearPublished(),
                bookEntity.getAvailableCopies() > 0
        );

    }
    public List<GetBookDto> getAll(){
        var books = bookRepository.findAll();
        return books.stream().map((book) -> new GetBookDto(
                book.getId(),
                book.getIsbn(),
                book.getTitle(),
                book.getAuthor(),
                book.getPublisher(),
                book.getYearPublished(),
                book.getAvailableCopies() > 0
        )).collect(Collectors.toList());
    }

    public CreateBookResponseDto create(CreateBookDto book){
        var bookEntity = new BookEntity();
        bookEntity.setIsbn(book.getIsbn());
        bookEntity.setTitle(book.getTitle());
        bookEntity.setAuthor(book.getAuthor());
        bookEntity.setPublisher(book.getPublisher());
        bookEntity.setYearPublished(book.getYearPublished());
        bookEntity.setAvailableCopies(book.getAvailableCopies());

        var newBook = bookRepository.save(bookEntity);
        return new CreateBookResponseDto(
                newBook.getId(),
                newBook.getIsbn(),
                newBook.getTitle(),
                newBook.getAuthor(),
                newBook.getPublisher(),
                newBook.getYearPublished(),
                newBook.getAvailableCopies());
    }

    public void delete(long id){

        if(!bookRepository.existsById(id)){
            throw new RuntimeException();
        }
        bookRepository.deleteById(id);
    }
}

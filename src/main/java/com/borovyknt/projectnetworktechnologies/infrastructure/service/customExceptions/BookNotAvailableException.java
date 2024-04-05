package com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class BookNotAvailableException extends RuntimeException {
    private BookNotAvailableException(String message) {
        super(message);
    }

    public static ResponseStatusException create() {
        BookNotAvailableException error = new BookNotAvailableException("Book is not available");
        return new ResponseStatusException(HttpStatus.CONFLICT, error.getMessage(), error);
    }
}
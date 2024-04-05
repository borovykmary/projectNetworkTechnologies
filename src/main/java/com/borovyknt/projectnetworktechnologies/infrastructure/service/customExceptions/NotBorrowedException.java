package com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotBorrowedException extends RuntimeException {
    private NotBorrowedException(String message) {
        super(message);
    }

    public static ResponseStatusException create() {
        NotBorrowedException error = new NotBorrowedException("User has not borrowed this book");
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, error.getMessage(), error);
    }
}

package com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AlreadyReviewedException extends RuntimeException {
    private AlreadyReviewedException(String message) {
        super(message);
    }

    public static ResponseStatusException create() {
        AlreadyReviewedException error = new AlreadyReviewedException("User has already reviewed this book");
        return new ResponseStatusException(HttpStatus.CONFLICT, error.getMessage(), error);
    }
}
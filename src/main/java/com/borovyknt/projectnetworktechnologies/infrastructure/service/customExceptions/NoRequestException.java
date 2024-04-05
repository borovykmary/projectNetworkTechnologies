package com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NoRequestException extends RuntimeException {
    private NoRequestException(String message) {
        super(message);
    }

    public static ResponseStatusException create(String requestName) {
        NoRequestException error = new NoRequestException("There was no " + requestName + " request for this loan");
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, error.getMessage(), error);
    }
}
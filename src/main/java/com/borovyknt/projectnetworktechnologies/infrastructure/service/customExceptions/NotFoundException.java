package com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotFoundException extends RuntimeException{
    private NotFoundException(String message) {
        super(message);
    }

    public static ResponseStatusException create(String entityName, long id) {
        NotFoundException error = new NotFoundException(entityName + " not found with id: " + id);
        return new ResponseStatusException(HttpStatus.NOT_FOUND, error.getMessage(), error);
    }
}

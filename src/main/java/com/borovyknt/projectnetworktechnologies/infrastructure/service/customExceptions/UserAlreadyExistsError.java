package com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserAlreadyExistsError extends RuntimeException{
    private UserAlreadyExistsError(String message) {
        super(message);
    }
    public static ResponseStatusException create(String username){
        UserAlreadyExistsError error = new UserAlreadyExistsError("User with username " + username + " already exists");
        return new ResponseStatusException(HttpStatus.CONFLICT, error.getMessage(), error);
    }
}

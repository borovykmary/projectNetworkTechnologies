package com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class WrongPasswordError extends RuntimeException{
    private WrongPasswordError(String message) {
        super(message);
    }

    public static ResponseStatusException create(String password){
        WrongPasswordError error = new WrongPasswordError("Password does not match");
        return new ResponseStatusException(HttpStatus.CONFLICT, error.getMessage(), error);
    }
}

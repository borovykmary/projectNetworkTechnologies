package com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class LoanNotProcessedException extends RuntimeException {
    private LoanNotProcessedException(String message) {
        super(message);
    }

    public static ResponseStatusException create() {
        LoanNotProcessedException error = new LoanNotProcessedException("Loan does not exist or has not been processed yet");
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, error.getMessage(), error);
    }
}
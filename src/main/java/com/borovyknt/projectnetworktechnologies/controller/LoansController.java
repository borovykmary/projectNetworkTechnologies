package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.infrastructure.service.BookService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/loans")
public class LoansController {
    private final LoanService loanService;

    @Autowired
    public LoansController(LoanService loanService) {
        this.loanService = loanService;
    }
    @GetMapping
    String getAll(){
        return "Mock all";
    }
}

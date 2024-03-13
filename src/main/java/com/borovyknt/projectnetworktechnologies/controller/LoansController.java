package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.LoanEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.LoanRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.BookService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoansController {
    private final LoanService loanService;

    @Autowired
    public LoansController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping
    public List<LoanEntity> getAllLoans(){
        return loanService.getAll();
    }

    @GetMapping("/{id}")
    public LoanEntity getOne(@PathVariable long id){
        return loanService.getOne(id);
    }

    @PostMapping
    public LoanEntity create(@RequestBody LoanEntity loan){
        return loanService.create(loan);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){
        loanService.delete(id);
    }
}

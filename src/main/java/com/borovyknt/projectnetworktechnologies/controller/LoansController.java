package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.controller.dto.loan.CreateLoanDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.loan.CreateLoanResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.loan.GetLoanDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.LoanEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.LoanRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.BookService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public List<GetLoanDto> getAllLoans(){
        return loanService.getAll();
    }

    @GetMapping("/{id}")
    public GetLoanDto getOne(@PathVariable long id){
        return loanService.getOne(id);
    }

    @PostMapping
    public ResponseEntity<CreateLoanResponseDto> create(@RequestBody CreateLoanDto loan){
        var newLoan = loanService.create(loan);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        loanService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

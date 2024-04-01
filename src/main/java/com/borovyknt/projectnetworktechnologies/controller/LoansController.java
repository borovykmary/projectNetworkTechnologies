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
import org.springframework.security.access.prepost.PreAuthorize;
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

   /* @PostMapping
    public ResponseEntity<CreateLoanResponseDto> create(@RequestBody CreateLoanDto loan, @PathVariable long bookId){
        var newLoan = loanService.create(loan, bookId);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }
    */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        loanService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{bookId}/borrow/{userId}")
    public ResponseEntity<CreateLoanResponseDto> borrowBook(@RequestBody CreateLoanDto loan, @PathVariable String bookId, @PathVariable String userId){
        var bookIdlong = Long.parseLong(bookId.substring(1, bookId.length() - 1));
        var userIdlong = Long.parseLong(userId.substring(1, userId.length() - 1));

        var newLoan = loanService.borrowBook(loan, bookIdlong, userIdlong);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    @PostMapping("/{loanId}/return")
    public ResponseEntity<Void> returnBook(@PathVariable String loanId){
        var loanIdLong = Long.parseLong(loanId.substring(1, loanId.length() - 1));
        loanService.returnBook(loanIdLong);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{loanId}/process")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> processLoan(@PathVariable String loanId){
        var loanIdLong = Long.parseLong(loanId.substring(1, loanId.length() - 1));
        loanService.processLoan(loanIdLong);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{loanId}/return/process")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> processReturn(@PathVariable String loanId){
        var loanIdLong = Long.parseLong(loanId.substring(1, loanId.length() - 1));
        loanService.processReturn(loanIdLong);
        return ResponseEntity.noContent().build();
    }

}

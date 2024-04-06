package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.controller.dto.loan.*;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.UserRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.JwtService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.LoanService;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.NotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoansController {
    private final LoanService loanService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Autowired
    public LoansController(LoanService loanService, UserRepository userRepository, JwtService jwtService) {
        this.loanService = loanService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<GetLoanDto> getAllLoans(){
        return loanService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public GetLoanDto getOne(@PathVariable String id){
        var idLong = Long.parseLong(id.substring(1, id.length() - 1));
        return loanService.getOne(idLong);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id){
        var idLong = Long.parseLong(id.substring(1, id.length() - 1));
        loanService.delete(idLong);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/history")
    public List<GetLoanDto> getLoanHistory(HttpServletRequest request){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Integer userId = jwtService.extractUserId(token);
        return loanService.getLoanHistory(userId);
    }
    @PostMapping("/{bookId}/borrow")
    public ResponseEntity<CreateLoanResponseDto> borrowBook(@RequestBody CreateLoanDto loan, HttpServletRequest request, @PathVariable String bookId){
        var bookIdlong = Long.parseLong(bookId.substring(1, bookId.length() - 1));

        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Integer userId = jwtService.extractUserId(token);
        var userEntity = userRepository.findByuserId(userId)
                .orElseThrow(() -> NotFoundException.create("User", userId));

        var newLoan = loanService.borrowBook(loan, bookIdlong, userEntity);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    @PostMapping("/{loanId}/return")
    public ResponseEntity<CreateReturnLoanResponseDto> returnBook(@PathVariable String loanId, HttpServletRequest request, @RequestBody CreateReturnLoanDto returnLoanDto){
        var loanIdLong = Long.parseLong(loanId.substring(1, loanId.length() - 1));
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Integer userId = jwtService.extractUserId(token);
        var userEntity = userRepository.findByuserId(userId)
                .orElseThrow(() -> NotFoundException.create("User", userId));

        var newReturnLoan = loanService.returnBook(returnLoanDto, loanIdLong, userEntity);
        return new ResponseEntity<>(newReturnLoan, HttpStatus.OK);
    }

    @PostMapping("/{loanId}/process")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> processLoan(@PathVariable String loanId){
        var loanIdLong = Long.parseLong(loanId.substring(1, loanId.length() - 1));
        loanService.processLoan(loanIdLong);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/{loanId}/return/process")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> processReturn(@PathVariable String loanId){
        var loanIdLong = Long.parseLong(loanId.substring(1, loanId.length() - 1));
        loanService.processReturn(loanIdLong);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}

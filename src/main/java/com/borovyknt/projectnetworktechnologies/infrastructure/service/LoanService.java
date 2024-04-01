package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.controller.dto.loan.CreateLoanDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.loan.CreateLoanResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.loan.GetLoanDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.LoanEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.LoanRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public GetLoanDto getOne(long id){
        var loanEntity = loanRepository.findById(id).orElseThrow(() -> new RuntimeException("Loan not found"));
        return new GetLoanDto(
                loanEntity.getLoanId(),
                loanEntity.getLoanDate(),
                loanEntity.getReturnDate(),
                loanEntity.getDueDate()
        );
    }

    public List<GetLoanDto> getAll(){
        var loans = loanRepository.findAll();
        return loans.stream().map((loan) -> new GetLoanDto(
                loan.getLoanId(),
                loan.getLoanDate(),
                loan.getReturnDate(),
                loan.getDueDate()
        )).toList();
    }
    @Transactional
    public CreateLoanResponseDto borrowBook(CreateLoanDto loan, long bookId, long userId){
        var bookEntity = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        if(bookEntity.getAvailableCopies() <= 0) {
            throw new RuntimeException("Book is not available");
        }

        var loanEntity = new LoanEntity();
        loanEntity.setLoanDate(loan.getLoanDate());
        loanEntity.setReturnDate(loan.getReturnDate());
        loanEntity.setDueDate(loan.getDueDate());
        loanEntity.setBook(bookEntity);
        loanEntity.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
        loanEntity.setStatus("Not processed");

        var newLoan = loanRepository.save(loanEntity);

        bookEntity.setAvailableCopies(bookEntity.getAvailableCopies() - 1);
        bookRepository.save(bookEntity);

        return new CreateLoanResponseDto(
                newLoan.getLoanId(),
                newLoan.getLoanDate(),
                newLoan.getReturnDate(),
                newLoan.getDueDate()
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void processLoan(long loanId){
        var loanEntity = loanRepository.findById(loanId).orElseThrow(() -> new RuntimeException("Loan not found"));
        loanEntity.setStatus("Processed");

        var bookEntity = loanEntity.getBook();
        bookEntity.setAvailableCopies(bookEntity.getAvailableCopies() - 1);
        bookRepository.save(bookEntity);
        loanRepository.save(loanEntity);
    }
    @Transactional
    public void returnBook(long loanId){
        var loanEntity = loanRepository.findById(loanId).orElseThrow(() -> new RuntimeException("Loan not found"));
        if(!loanEntity.getStatus().equals("Processed")) {
            throw new RuntimeException("Loan has not been processed yet");
        }
        loanEntity.setStatus("Return Pending");
        loanRepository.save(loanEntity);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void processReturn(long loanId){
        var loanEntity = loanRepository.findById(loanId).orElseThrow(() -> new RuntimeException("Loan not found"));
        if (!loanEntity.getStatus().equals("Return Pending")) {
            throw new RuntimeException("Book has not been returned yet");
        }
        loanEntity.setStatus("Returned");
        var bookEntity = loanEntity.getBook();
        bookEntity.setAvailableCopies(bookEntity.getAvailableCopies() + 1);
        bookRepository.save(bookEntity);
        loanRepository.save(loanEntity);
    }

    /*
    public CreateLoanResponseDto create(CreateLoanDto loan, long bookId){
        var bookEntity = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        if(bookEntity.getAvailableCopies() <= 0) {
            throw new RuntimeException("Book is not available");
        }

        var loanEntity = new LoanEntity();
        loanEntity.setLoanDate(loan.getLoanDate());
        loanEntity.setReturnDate(loan.getReturnDate());
        loanEntity.setDueDate(loan.getDueDate());
        loanEntity.setBook(bookEntity);

        var newLoan = loanRepository.save(loanEntity);

        bookEntity.setAvailableCopies(bookEntity.getAvailableCopies() - 1);
        bookRepository.save(bookEntity);

        return new CreateLoanResponseDto(
                newLoan.getLoanId(),
                newLoan.getLoanDate(),
                newLoan.getReturnDate(),
                newLoan.getDueDate()
        );
    }
     */

    public void delete(long id){
        if(loanRepository.existsById(id)) {
            loanRepository.deleteById(id);
        } else {
            throw new RuntimeException("Loan not found");
        }
    }
}

package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.commontypes.LoanStatus;
import com.borovyknt.projectnetworktechnologies.controller.dto.loan.*;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.LoanEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.BookRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.LoanRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.BookNotAvailableException;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.LoanNotProcessedException;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.NoRequestException;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    private final BookRepository bookRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository, BookRepository bookRepository) {
        this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
    }

    public GetLoanDto getOne(long id){
        var loanEntity = loanRepository.findById(id).orElseThrow(() -> NotFoundException.create("Loan", id));
        return new GetLoanDto(
                loanEntity.getLoanId(),
                loanEntity.getLoanDate(),
                loanEntity.getReturnDate(),
                loanEntity.getDueDate(),
                loanEntity.getStatus()
        );
    }

    public List<GetLoanDto> getLoanHistory(int userId) {
        var loans = loanRepository.findAllByUser_UserId(userId);
        return loans.stream().map((loan) -> new GetLoanDto(
                loan.getLoanId(),
                loan.getLoanDate(),
                loan.getReturnDate(),
                loan.getDueDate(),
                loan.getStatus()
        )).toList();
    }

    public List<GetLoanDto> getAll(){
        var loans = loanRepository.findAll();
        return loans.stream().map((loan) -> new GetLoanDto(
                loan.getLoanId(),
                loan.getLoanDate(),
                loan.getReturnDate(),
                loan.getDueDate(),
                loan.getStatus()
        )).toList();
    }
    @Transactional
    public CreateLoanResponseDto borrowBook(CreateLoanDto loan, long bookId, UserEntity userEntity){
        var bookEntity = bookRepository.findById(bookId).orElseThrow(() -> NotFoundException.create("Book", bookId));
        if(bookEntity.getAvailableCopies() <= 0) {
            throw BookNotAvailableException.create();
        }

        var loanEntity = new LoanEntity();
        loanEntity.setLoanDate(loan.getLoanDate());
        loanEntity.setReturnDate(loan.getReturnDate());
        loanEntity.setDueDate(loan.getDueDate());
        loanEntity.setBook(bookEntity);
        loanEntity.setUser(userEntity);
        loanEntity.setStatus(LoanStatus.BORROW_REQUESTED);

        var newLoan = loanRepository.save(loanEntity);

        return new CreateLoanResponseDto(
                newLoan.getLoanId(),
                newLoan.getLoanDate(),
                newLoan.getDueDate(),
                newLoan.getReturnDate(),
                newLoan.getStatus()
        );
    }

    public void processLoan(long loanId){
        var loanEntity = loanRepository.findById(loanId).orElseThrow(() -> NotFoundException.create("Loan", loanId));
        if(!loanEntity.getStatus().equals(LoanStatus.BORROW_REQUESTED)) {
            throw NoRequestException.create("borrow");
        }
        loanEntity.setStatus(LoanStatus.BORROWED);

        var bookEntity = loanEntity.getBook();
        bookEntity.setAvailableCopies(bookEntity.getAvailableCopies() - 1);
        bookRepository.save(bookEntity);
        loanRepository.save(loanEntity);
    }
    @Transactional
    public CreateReturnLoanResponseDto returnBook(CreateReturnLoanDto loan, long loanId, UserEntity userEntity){
        var loanEntity = loanRepository.findById(loanId).orElseThrow(() -> NotFoundException.create("Loan", loanId));
        if(!loanEntity.getStatus().equals(LoanStatus.BORROWED)) {
            throw LoanNotProcessedException.create();
        }
        loanEntity.setStatus(LoanStatus.RETURN_REQUESTED);
        loanEntity.setReturnDate(loan.getReturnDate());
        loanEntity.setUser(userEntity);

        var newReturnLoan = loanRepository.save(loanEntity);

        return new CreateReturnLoanResponseDto(
                newReturnLoan.getLoanId(),
                newReturnLoan.getReturnDate(),
                newReturnLoan.getStatus()
        );

    }

    public void processReturn(long loanId){
        var loanEntity = loanRepository.findById(loanId).orElseThrow(() -> NotFoundException.create("Loan", loanId));
        if (!loanEntity.getStatus().equals(LoanStatus.RETURN_REQUESTED)) {
            throw NoRequestException.create("return");
        }
        if (loanEntity.getReturnDate().after(loanEntity.getDueDate())) {
            loanEntity.setStatus(LoanStatus.RETURNED_LATE);
        } else {
            loanEntity.setStatus(LoanStatus.RETURNED);
        }
        var bookEntity = loanEntity.getBook();
        bookEntity.setAvailableCopies(bookEntity.getAvailableCopies() + 1);
        bookRepository.save(bookEntity);
        loanRepository.save(loanEntity);
    }

    public void delete(long id){
        if(loanRepository.existsById(id)) {
            loanRepository.deleteById(id);
        } else {
            throw new RuntimeException("Loan not found");
        }
    }
}

package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.controller.dto.loan.CreateLoanDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.loan.CreateLoanResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.loan.GetLoanDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.LoanEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {
    private final LoanRepository loanRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
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

    public CreateLoanResponseDto create(CreateLoanDto loan){
        var loanEntity = new LoanEntity();
        loanEntity.setLoanDate(loan.getLoanDate());
        loanEntity.setReturnDate(loan.getReturnDate());
        loanEntity.setDueDate(loan.getDueDate());

        var newLoan = loanRepository.save(loanEntity);
        return new CreateLoanResponseDto(
                newLoan.getLoanId(),
                newLoan.getLoanDate(),
                newLoan.getReturnDate(),
                newLoan.getDueDate()
        );
    }

    public void delete(long id){
        if(loanRepository.existsById(id)) {
            loanRepository.deleteById(id);
        } else {
            throw new RuntimeException("Loan not found");
        }
    }
}

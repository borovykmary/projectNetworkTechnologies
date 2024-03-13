package com.borovyknt.projectnetworktechnologies.infrastructure.service;

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

    public LoanEntity getOne(long id){
        return loanRepository.findById(id).orElseThrow(() -> new RuntimeException("Loan not found"));
    }

    public List<LoanEntity> getAll(){
        return loanRepository.findAll();
    }

    public LoanEntity create(LoanEntity loan){
        return loanRepository.save(loan);
    }

    public void delete(long id){
        if(loanRepository.existsById(id)) {
            loanRepository.deleteById(id);
        } else {
            throw new RuntimeException("Loan not found");
        }
    }
}

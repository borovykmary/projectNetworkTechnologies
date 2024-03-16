package com.borovyknt.projectnetworktechnologies.controller.dto.loan;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import jakarta.persistence.*;

import java.util.Date;

public class CreateLoanDto {
    private Date loanDate;
    private Date dueDate;
    private Date returnDate;

    public CreateLoanDto(Date loanDate, Date dueDate, Date returnDate) {
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
    }

    public Date getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(Date loanDate) {
        this.loanDate = loanDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public CreateLoanDto() {
    }
}

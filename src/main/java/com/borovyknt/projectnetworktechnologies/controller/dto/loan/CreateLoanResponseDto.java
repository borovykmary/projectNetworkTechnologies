package com.borovyknt.projectnetworktechnologies.controller.dto.loan;

import java.util.Date;

public class CreateLoanResponseDto {
    private int loanId;
    private Date loanDate;
    private Date dueDate;
    private Date returnDate;

    public CreateLoanResponseDto(int loanId, Date loanDate, Date dueDate, Date returnDate) {
        this.loanId = loanId;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
    }

    public CreateLoanResponseDto() {
    }

    public int getLoanId() {
        return loanId;
    }

    public void setLoanId(int loanId) {
        this.loanId = loanId;
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
}

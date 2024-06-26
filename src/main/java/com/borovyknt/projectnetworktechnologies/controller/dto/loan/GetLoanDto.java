package com.borovyknt.projectnetworktechnologies.controller.dto.loan;

import com.borovyknt.projectnetworktechnologies.commontypes.LoanStatus;

import java.util.Date;

public class GetLoanDto {
    private int loanId;
    private Date loanDate;
    private Date dueDate;
    private Date returnDate;
    private LoanStatus status;
    private int bookId;

    public GetLoanDto(int loanId, Date loanDate, Date dueDate, Date returnDate, LoanStatus status, int bookId) {
        this.loanId = loanId;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.status = status;
        this.bookId = bookId;
    }

    public GetLoanDto() {
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
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

    public LoanStatus getStatus() {
        return status;
    }

    public void setStatus(LoanStatus status) {
        this.status = status;
    }
}

package com.borovyknt.projectnetworktechnologies.controller.dto.loan;

import com.borovyknt.projectnetworktechnologies.commontypes.LoanStatus;

import java.util.Date;

public class CreateReturnLoanResponseDto {
    private int loanId;
    private Date returnDate;
    private LoanStatus status;

    public CreateReturnLoanResponseDto(int loanId, Date returnDate, LoanStatus status) {
        this.loanId = loanId;
        this.returnDate = returnDate;
        this.status = status;
    }

    public int getLoanId() {
        return loanId;
    }

    public void setLoanId(int loanId) {
        this.loanId = loanId;
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

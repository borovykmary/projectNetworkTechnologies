package com.borovyknt.projectnetworktechnologies.controller.dto.loan;

import java.util.Date;

public class CreateReturnLoanDto {
    private int loanId;
    private Date returnDate;

    public CreateReturnLoanDto(Date returnDate, int loanId) {
        this.returnDate = returnDate;
        this.loanId = loanId;
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
}

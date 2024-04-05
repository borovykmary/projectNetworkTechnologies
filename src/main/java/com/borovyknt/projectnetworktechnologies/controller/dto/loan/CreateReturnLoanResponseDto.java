package com.borovyknt.projectnetworktechnologies.controller.dto.loan;

import java.util.Date;

public class CreateReturnLoanResponseDto {
    private int loanId;
    private Date returnDate;
    private String status;

    public CreateReturnLoanResponseDto(int loanId, Date returnDate, String status) {
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

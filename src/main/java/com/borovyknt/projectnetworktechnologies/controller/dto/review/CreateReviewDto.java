package com.borovyknt.projectnetworktechnologies.controller.dto.review;

import java.util.Date;

public class CreateReviewDto {

    private double rating;
    private String comment;
    private Date reviewDate;
    private int bookId;

    public CreateReviewDto(double rating, String comment, Date reviewDate, int bookId) {
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
        this.bookId = bookId;
    }

    public CreateReviewDto() {
    }

    public double getRating() {
        return rating;
    }
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }
}

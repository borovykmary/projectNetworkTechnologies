package com.borovyknt.projectnetworktechnologies.controller.dto.review;

import java.util.Date;

public class CreateReviewDto {

    private int rating;
    private String comment;
    private Date reviewDate;
    private long bookId;

    public CreateReviewDto(int rating, String comment, Date reviewDate, long bookId) {
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
        this.bookId = bookId;
    }

    public CreateReviewDto() {
    }

    public int getRating() {
        return rating;
    }
    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public void setRating(int rating) {
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

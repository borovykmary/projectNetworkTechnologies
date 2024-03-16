package com.borovyknt.projectnetworktechnologies.controller.dto.review;

import java.util.Date;

public class CreateReviewDto {

    private int rating;
    private String comment;
    private Date reviewDate;

    public CreateReviewDto(int rating, String comment, Date reviewDate) {
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
    }

    public CreateReviewDto() {
    }

    public int getRating() {
        return rating;
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

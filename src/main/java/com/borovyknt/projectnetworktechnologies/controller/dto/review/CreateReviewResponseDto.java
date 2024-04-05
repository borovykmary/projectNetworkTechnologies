package com.borovyknt.projectnetworktechnologies.controller.dto.review;

import java.util.Date;

public class CreateReviewResponseDto {
    private int reviewId;
    private double rating;
    private String comment;
    private Date reviewDate;

    public CreateReviewResponseDto(int reviewId, double rating, String comment, Date reviewDate) {
        this.reviewId = reviewId;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
    }

    public CreateReviewResponseDto() {
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public double getRating() {
        return rating;
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

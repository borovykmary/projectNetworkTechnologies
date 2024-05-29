package com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails;

import com.borovyknt.projectnetworktechnologies.infrastructure.entity.BookEntity;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class CreateResponseBookDetailsDto {
    private int bookId;
    private String genre;
    private String summary;
    private String coverImageUrl;

    public CreateResponseBookDetailsDto(int bookId, String genre, String summary, String coverImageUrl) {
        this.bookId = bookId;
        this.genre = genre;
        this.summary = summary;
        this.coverImageUrl = coverImageUrl;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
}

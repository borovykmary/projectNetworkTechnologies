package com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails;

public class CreateBookDetailsDto {
    private String genre;
    private String summary;
    private String coverImageUrl;
    private String isbn;

    public CreateBookDetailsDto(String genre, String summary, String coverImageUrl, String isbn) {
        this.genre = genre;
        this.summary = summary;
        this.coverImageUrl = coverImageUrl;
        this.isbn = isbn;
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

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}

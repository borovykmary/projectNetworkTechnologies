package com.borovyknt.projectnetworktechnologies.controller.dto.bookDetails;

public class GetBookDetailsDto {
    private int id;
    private int bookId;
    private String genre;
    private String summary;
    private String coverImageUrl;

    public GetBookDetailsDto(int id, int bookId, String genre, String summary, String coverImageUrl) {
        this.id = id;
        this.bookId = bookId;
        this.genre = genre;
        this.summary = summary;
        this.coverImageUrl = coverImageUrl;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
}

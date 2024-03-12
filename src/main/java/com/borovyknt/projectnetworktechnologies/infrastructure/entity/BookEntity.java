package com.borovyknt.projectnetworktechnologies.infrastructure.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "books", schema = "library")
public class BookEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "isbn")
    private String isbn;

    @Basic
    @Column(name = "title")
    private String title;

    @Basic
    @Column(name = "author")
    private String author;

    @Basic
    @Column(name = "publisher")
    private String publisher;

    @Basic
    @Column(name = "year_published")
    private int yearPublished;

    @Basic
    @Column(name = "available_copies")
    private int availableCopies;
}

package com.borovyknt.projectnetworktechnologies.infrastructure.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "book_details", schema = "library")
public class BookDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "id")
    private BookEntity book;

    @Basic
    @Column(name = "genre")
    private String genre;

    @Basic
    @Column(name = "summary")
    private String summary;

    @Basic
    @Column(name = "cover_image_url")
    private String coverImageUrl;

}

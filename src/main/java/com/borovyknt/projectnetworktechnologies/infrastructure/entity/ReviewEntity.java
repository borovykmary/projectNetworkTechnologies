package com.borovyknt.projectnetworktechnologies.infrastructure.entity;


import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "reviews", schema = "library")
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int reviewId;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "id")
    private BookEntity book;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UsersEntity user;

    @Basic
    @Column(name = "rating")
    private int rating;

    @Basic
    @Column(name = "comment")
    private String comment;

    @Basic
    @Column(name = "review_date")
    private Date reviewDate;

}
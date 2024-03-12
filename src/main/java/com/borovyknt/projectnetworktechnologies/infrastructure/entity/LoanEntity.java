package com.borovyknt.projectnetworktechnologies.infrastructure.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "loans", schema = "library")
public class LoanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_id")
    private int loanId;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "id")
    private BookEntity book;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UsersEntity user;

    @Basic
    @Column(name = "loan_date")
    private Date loanDate;

    @Basic
    @Column(name = "due_date")
    private Date dueDate;

    @Basic
    @Column(name = "return_date")
    private Date returnDate;

}
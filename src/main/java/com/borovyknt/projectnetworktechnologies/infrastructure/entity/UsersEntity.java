package com.borovyknt.projectnetworktechnologies.infrastructure.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users", schema = "library")
public class UsersEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Basic
    @Column(name = "username")
    private String username;

    @Basic
    @Column(name = "password")
    private String password;

    @Basic
    @Column(name = "role")
    private String role;

    @Basic
    @Column(name = "email")
    private String email;

    @Basic
    @Column(name = "name")
    private String name;
}

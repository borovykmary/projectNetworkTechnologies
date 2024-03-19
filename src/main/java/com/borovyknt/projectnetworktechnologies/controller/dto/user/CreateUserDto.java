package com.borovyknt.projectnetworktechnologies.controller.dto.user;


import com.borovyknt.projectnetworktechnologies.commontypes.UserRole;

public class CreateUserDto {
    private String email;
    private String name;

    public CreateUserDto(String email, String name) {
        this.email = email;
        this.name = name;
    }

    public CreateUserDto() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

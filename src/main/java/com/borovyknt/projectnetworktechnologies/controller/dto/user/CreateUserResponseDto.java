package com.borovyknt.projectnetworktechnologies.controller.dto.user;

import com.borovyknt.projectnetworktechnologies.commontypes.UserRole;

public class CreateUserResponseDto {
    private int userId;
    private String email;
    private String name;

    public CreateUserResponseDto(int userId, String email, String name) {
        this.userId = userId;
        this.email = email;
        this.name = name;
    }

    public CreateUserResponseDto() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

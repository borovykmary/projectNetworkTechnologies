package com.borovyknt.projectnetworktechnologies.controller.dto.register;

import com.borovyknt.projectnetworktechnologies.commontypes.UserRole;

public class RegisterResponseDto {
    private String username;
    private UserRole role;
    private long userId;

    public RegisterResponseDto(String username, UserRole role, long userId) {
        this.username = username;
        this.role = role;
        this.userId = userId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
    /* private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public RegisterResponseDto(String token) {
        this.token = token;
    } */

}

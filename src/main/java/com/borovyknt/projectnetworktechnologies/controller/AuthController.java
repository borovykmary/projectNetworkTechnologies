package com.borovyknt.projectnetworktechnologies.controller;

import com.borovyknt.projectnetworktechnologies.controller.dto.login.LoginDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.login.LoginResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.register.RegisterDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.register.RegisterResponseDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterDto requestBody){
        RegisterResponseDto dto = authService.register(requestBody);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public ResponseEntity<LoginResponseDto> register(@RequestBody LoginDto requestBody) {
        LoginResponseDto dto = authService.login(requestBody);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public void signIn() {
    }

    public void signUp() {
    }
}

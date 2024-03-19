package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.commontypes.UserRole;
import com.borovyknt.projectnetworktechnologies.controller.dto.login.LoginDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.login.LoginResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.register.RegisterDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.register.RegisterResponseDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.AuthEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.AuthRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Autowired
    public AuthService(AuthRepository authRepository, UserRepository userRepository, JwtService jwtService) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    public RegisterResponseDto register(RegisterDto dto){
        var userEntity = new UserEntity();
        userEntity.setEmail(dto.getEmail());
        UserEntity createdUser = userRepository.save(userEntity);

        AuthEntity authEntity = new AuthEntity();
        authEntity.setPassword(dto.getPassword());
        authEntity.setUsername(dto.getUsername());
        authEntity.setRole(dto.getRole());
        authEntity.setUser(createdUser);

        AuthEntity createdAuth = authRepository.save(authEntity);
        return new RegisterResponseDto(createdAuth.getUsername(), createdAuth.getRole());
    }
    public LoginResponseDto login(LoginDto dto) {
        AuthEntity authEntity = authRepository.findByUsername(dto.getUsername()).orElseThrow(RuntimeException::new);

        if (!authEntity.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException();
        }
        String token = jwtService.generateToken(authEntity);
        UserRole userRole = jwtService.extractRole(token);
        return new LoginResponseDto(userRole.name());
    }
}

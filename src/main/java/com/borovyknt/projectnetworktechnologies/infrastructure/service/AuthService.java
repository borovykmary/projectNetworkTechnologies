package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.controller.dto.login.LoginDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.login.LoginResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.register.RegisterDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.register.RegisterResponseDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.AuthEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.AuthRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.UserRepository;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.UserAlreadyExistsError;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.customExceptions.WrongPasswordError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthRepository authRepository, UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }
    @Transactional
    public RegisterResponseDto register(RegisterDto dto){
        Optional<AuthEntity> existingAuth = authRepository.findByUsername(dto.getUsername());

        if (existingAuth.isPresent()) {
            throw UserAlreadyExistsError.create(dto.getUsername());
        }

        var userEntity = new UserEntity();
        userEntity.setEmail(dto.getEmail());
        userRepository.save(userEntity);

        AuthEntity authEntity = new AuthEntity();

        String hashedPassword = passwordEncoder.encode(dto.getPassword());
        authEntity.setPassword(hashedPassword);
        authEntity.setUsername(dto.getUsername());
        authEntity.setRole(dto.getRole());
        authEntity.setUser(userEntity);

        authRepository.save(authEntity);
        return new RegisterResponseDto(authEntity.getUsername(), authEntity.getRole(), userEntity.getUserId());
    }
    public LoginResponseDto login(LoginDto dto) {
        AuthEntity authEntity = authRepository.findByUsername(dto.getUsername()).orElseThrow(RuntimeException::new);


        if (!passwordEncoder.matches(dto.getPassword(), authEntity.getPassword())) {
            throw WrongPasswordError.create(dto.getPassword());
        }
        String token = jwtService.generateToken(authEntity);
        return new LoginResponseDto(token);
    }
}

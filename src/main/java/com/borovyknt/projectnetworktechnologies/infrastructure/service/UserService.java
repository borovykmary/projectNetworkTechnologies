package com.borovyknt.projectnetworktechnologies.infrastructure.service;

import com.borovyknt.projectnetworktechnologies.controller.dto.user.CreateUserDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.user.CreateUserResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.user.GetUserDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public GetUserDto getOne(long id){
        var userEntity = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return new GetUserDto(
                userEntity.getUserId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.getRole(),
                userEntity.getEmail(),
                userEntity.getName()
        );
    }

    public List<GetUserDto> getAll(){
        var users = userRepository.findAll();
        return users.stream().map((user) -> new GetUserDto(
                user.getUserId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole(),
                user.getEmail(),
                user.getName()
        )).collect(java.util.stream.Collectors.toList());
    }

    public CreateUserResponseDto create(CreateUserDto user){
        var userEntity = new UserEntity();
        userEntity.setUsername(user.getUsername());
        userEntity.setPassword(user.getPassword());
        userEntity.setRole(user.getRole());
        userEntity.setEmail(user.getEmail());
        userEntity.setName(user.getName());

        var newUser = userRepository.save(userEntity);
        return new CreateUserResponseDto(
                newUser.getUserId(),
                newUser.getUsername(),
                newUser.getPassword(),
                newUser.getRole(),
                newUser.getEmail(),
                newUser.getName()
        );
    }

    public void delete(long id){
        if(!userRepository.existsById(id)){
            throw new RuntimeException();
        }
        userRepository.deleteById(id);
    }
}

package com.borovyknt.projectnetworktechnologies.controller;


import com.borovyknt.projectnetworktechnologies.controller.dto.user.CreateUserDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.user.CreateUserResponseDto;
import com.borovyknt.projectnetworktechnologies.controller.dto.user.GetUserDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<GetUserDto> getAllUsers(){
        return userService.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public GetUserDto getOne(@PathVariable long id){
        return userService.getOne(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

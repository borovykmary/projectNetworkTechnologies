package com.borovyknt.projectnetworktechnologies.controller;


import com.borovyknt.projectnetworktechnologies.infrastructure.entity.UserEntity;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<UserEntity> getAllUsers(){
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public UserEntity getOne(@PathVariable long id){
        return userService.getOne(id);
    }

    @PostMapping
    public UserEntity create(@RequestBody UserEntity user){
        return userService.create(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id){
        userService.delete(id);
    }
}

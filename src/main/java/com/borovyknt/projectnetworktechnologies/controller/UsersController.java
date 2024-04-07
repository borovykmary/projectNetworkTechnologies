package com.borovyknt.projectnetworktechnologies.controller;


import com.borovyknt.projectnetworktechnologies.controller.dto.user.GetUserDto;
import com.borovyknt.projectnetworktechnologies.infrastructure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<GetUserDto> getAllUsers(){
        return userService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public GetUserDto getOne(@PathVariable String id){
        var idLong = Long.parseLong(id.substring(1, id.length() - 1));
        return userService.getOne(idLong);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id){
        var idLong = Long.parseLong(id.substring(1, id.length() - 1));
        userService.delete(idLong);
        return ResponseEntity.noContent().build();
    }
}

package com.todolist.Manudev01.urbe.User.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.todolist.Manudev01.urbe.User.Services.userServices;
import com.todolist.Manudev01.urbe.User.Model.User;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/userRegister")
    public ResponseEntity<?> userRegister(@RequestBody User user) {
        userServices userService = new userServices();
        String result = userService.userRegister(user.getNombre(), user.getApellido(), user.getUsuario(), user.getContrasena());
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/login/{username}/{password}")
    public String login(@PathVariable String username, @PathVariable String password) {
        userServices userService = new userServices();
        return userService.login(username, password);
    }

    //Prueba
    @GetMapping("/getAllUsers")
    public String getAllUsers() {
        userServices userService = new userServices();
        return userService.getAllUsers();
    }
}

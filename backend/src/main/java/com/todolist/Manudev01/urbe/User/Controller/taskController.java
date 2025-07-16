package com.todolist.Manudev01.urbe.User.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/task")
public class taskController {


    @GetMapping("/getAllTasks")
    public String getAllTasks() {
        String sql = "SELECT * FROM tareas";
        return "List of all tasks";
    }
}

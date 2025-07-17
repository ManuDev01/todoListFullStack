package com.todolist.Manudev01.urbe.User.Controller;

import com.todolist.Manudev01.urbe.User.Services.tabServices;
import com.todolist.Manudev01.urbe.model.Tab;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tab")
public class tabController {

    private final tabServices tabService = new tabServices();

    @PostMapping("/tabRegister")
    public ResponseEntity<Tab> tabRegister(@RequestBody Tab tab) {
        Tab createdTab = tabService.addTab(tab);
        return ResponseEntity.ok(createdTab);
    }
}
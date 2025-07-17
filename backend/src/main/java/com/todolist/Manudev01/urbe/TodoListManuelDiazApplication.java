package com.todolist.Manudev01.urbe;

import com.todolist.Manudev01.urbe.Database.DatabaseConnection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoListManuelDiazApplication {

	public static void main(String[] args) {

		SpringApplication.run(TodoListManuelDiazApplication.class, args);
		DatabaseConnection.testConnection();
	}

}

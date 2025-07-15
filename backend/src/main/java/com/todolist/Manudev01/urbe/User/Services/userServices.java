package com.todolist.Manudev01.urbe.User.Services;

import com.todolist.Manudev01.urbe.Database.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class userServices {

    PreparedStatement ps;

    public String getAllUsers(){
        String sql = "SELECT * FROM usuarios";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                System.out.println("Usuario: " + resultSet.getString("usuario") +
                                   ", Nombre: " + resultSet.getString("nombre") +
                                   ", Apellido: " + resultSet.getString("apellido"));
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving users: " + e.getMessage());
        }
        return sql;
    }

    public String userRegister(String nombre, String apellido, String usuario, String contrasena) {
        String sql = "INSERT INTO usuarios(nombre, apellido, usuario, contrasena) VALUES (?, ?, ?, ?)";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, nombre);
            ps.setString(2, apellido);
            ps.setString(3, usuario);
            ps.setString(4, contrasena);
            int rowsAffected = ps.executeUpdate();
            if (rowsAffected > 0) {
                return "User registered successfully!";
            } else {
                return "Failed to register user.";
            }
        } catch (SQLException e) {
            return "Error during user registration: " + e.getMessage();
        }
    }

    public String login(String username, String password) {
        String sql = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, username);
            ps.setString(2, password);
            var resultSet = ps.executeQuery();
            if (resultSet.next()) {
                return "Login Succesfully";

            } else {
                System.out.println("User not found.");
                return "User not found.";
            }
        } catch (SQLException e) {
            return "Error retrieving user: " + e.getMessage();
        }
    }
}
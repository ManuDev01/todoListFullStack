package com.todolist.Manudev01.urbe.User.Services;

import com.todolist.Manudev01.urbe.Database.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class tabServices {

    public void addTab(){
        String sql = "INSERT INTO pestanas (nombre, idusuario) VALUES (?, ?)";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, "Nueva Pestaña");
            preparedStatement.setInt(2, 1); // Assuming user ID is 1 for demonstration
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Tab added successfully!");
            } else {
                System.out.println("Failed to add tab.");
            }
        } catch (SQLException e) {
            System.err.println("Error adding tab: " + e.getMessage());
        }
    }
    public String getAllTabs() {
        String sql = "SELECT * FROM pestanas";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            var resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                System.out.println("Tab: " + resultSet.getString("tab_name") +
                                   ", Description: " + resultSet.getString("description"));
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving tabs: " + e.getMessage());
        }
        return sql;
    }
}

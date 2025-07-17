package com.todolist.Manudev01.urbe.User.Services;

import com.todolist.Manudev01.urbe.Database.DatabaseConnection;
import com.todolist.Manudev01.urbe.model.Tab;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class tabServices {

    public Tab addTab(Tab tab) {
        String sql = "INSERT INTO pestanas (nombre, idusuario) VALUES (?, ?)";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setString(1, tab.getNombre()); // Retrieve 'nombre' from the Tab object
            preparedStatement.setLong(2, tab.getIdUsuario()); // Retrieve 'idUsuario' from the Tab object
            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                var resultSet = preparedStatement.getGeneratedKeys();
                if (resultSet.next()) {
                    tab.setId(resultSet.getLong(1)); // Set the generated ID (idpestana)
                }
                System.out.println("Tab added successfully!");
            } else {
                System.out.println("Failed to add tab.");
            }
        } catch (SQLException e) {
            System.err.println("Error adding tab: " + e.getMessage());
        }
        return tab;
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

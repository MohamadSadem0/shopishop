package com.example.ShopiShop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@RestController
public class DatabaseAdminController {

    @Autowired
    private DataSource dataSource;

    @DeleteMapping("/public/clear-database")
    public ResponseEntity<?> clearDatabase() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            // Disable foreign key checks
            stmt.execute("SET FOREIGN_KEY_CHECKS = 0;");

            // Drop all tables
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet rs = meta.getTables(null, null, "%", new String[]{"TABLE"});
            while (rs.next()) {
                String tableName = rs.getString("TABLE_NAME");
                stmt.execute("DROP TABLE IF EXISTS " + tableName);
            }

            // Re-enable foreign key checks
            stmt.execute("SET FOREIGN_KEY_CHECKS = 1;");

            return ResponseEntity.ok("Database cleared successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to clear the database: " + e.getMessage());
        }
    }
}

package com.shoppingcart.atelier.config;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotEnvConfig {
    static {
        loadEnvFile();
    }

    private static void loadEnvFile() {
        String[] paths = {".env", "./.env"};

        for (String path : paths) {
            File envFile = new File(path);
            if (envFile.exists()) {
                try (BufferedReader reader = new BufferedReader(new FileReader(envFile))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        if (line.isEmpty() || line.startsWith("#")) continue;

                        int idx = line.indexOf('=');
                        if (idx > 0) {
                            String key = line.substring(0, idx).trim();
                            String value = line.substring(idx + 1).trim();
                            if (!System.getProperties().containsKey(key)) {
                                System.setProperty(key, value);
                            }
                        }
                    }
                    System.out.println("✓ Loaded .env from: " + envFile.getAbsolutePath());
                    return;
                } catch (IOException e) {
                    System.err.println("Failed to load .env: " + e.getMessage());
                }
            }
        }
        System.out.println("No .env file found, using environment variables or defaults");
    }
}


-- SQL to insert dev user
-- Password: password123 (BCrypt hashed)

INSERT INTO users (u_type, u_email, u_username, u_password, u_fullName, u_phone, u_address, u_city, u_postal_code, u_country, u_is_active, created_at, updated_at)
VALUES (
    'CUSTOMER',
    'dev@atelier.com',
    'dev',
    '$2a$10$1AzBwWaxz5Z6uU5TcmxdJeGITTlWE9cJPtuBceGI4fbddahzYDWfe',
    'Atelier Dev',
    '0771234567',
    '123 Test Street',
    'Colombo',
    '00100',
    'Sri Lanka',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

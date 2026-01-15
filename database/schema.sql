-- Atelier Database Schema

-- Drop tables if they exist
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ----------------------------------------------
-- USERS TABLE
-- ----------------------------------------------
CREATE TABLE users (
    u_id BIGSERIAL PRIMARY KEY,
    u_type VARCHAR(20) NOT NULL CHECK (u_type IN ('CUSTOMER', 'STAFF')),
    u_email VARCHAR(255) NOT NULL UNIQUE,
    u_username VARCHAR(100) NOT NULL UNIQUE,
    u_password VARCHAR(255) NOT NULL,
    u_fullName VARCHAR(200) NOT NULL,
    u_phone VARCHAR(20),
    u_address TEXT,
    u_city VARCHAR(100),
    u_postal_code VARCHAR(20),
    u_country VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    u_last_login TIMESTAMP,
    u_is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_users_username ON users(u_username);
CREATE INDEX idx_users_user_type ON users(u_type);
CREATE INDEX idx_users_is_active ON users(u_is_active);

-- ----------------------------------------------
-- CATEGORIES TABLE (Fashion Categories)
-- ----------------------------------------------
CREATE TABLE categories (
    c_id BIGSERIAL PRIMARY KEY,
    c_name VARCHAR(100) NOT NULL UNIQUE,
    c_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------
-- PRODUCTS TABLE
-- ----------------------------------------------
CREATE TABLE products (
    p_id BIGSERIAL PRIMARY KEY,
    p_category_id BIGINT NOT NULL REFERENCES categories(c_id) ON DELETE CASCADE,
    p_name VARCHAR(255) NOT NULL,
    p_description TEXT NOT NULL,
    p_sku VARCHAR(100) UNIQUE NOT NULL,
    p_price DECIMAL(10, 2) NOT NULL CHECK (p_price >= 0),
    p_cost_price DECIMAL(10, 2) CHECK (p_cost_price >= 0),
    p_stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (p_stock_quantity >= 0),
    p_size VARCHAR(50), -- S, M, L, XL, XXL
    p_color VARCHAR(50),
    p_gender VARCHAR(20) CHECK (p_gender IN ('MEN', 'WOMEN', 'UNISEX', 'KIDS')),
    p_image_url VARCHAR(500),
    p_is_active BOOLEAN NOT NULL DEFAULT TRUE,
    p_is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    p_created_by BIGINT REFERENCES users(u_id) ON DELETE SET NULL
);

CREATE INDEX idx_products_category ON products(p_category_id);
CREATE INDEX idx_products_sku ON products(p_sku);
CREATE INDEX idx_products_name ON products(p_name);
CREATE INDEX idx_products_is_active ON products(p_is_active);
CREATE INDEX idx_products_price ON products(p_price);

-- ----------------------------------------------
-- CART_ITEMS TABLE
-- ----------------------------------------------
CREATE TABLE cart_items (
    c_id BIGSERIAL PRIMARY KEY,
    c_user_id BIGINT NOT NULL REFERENCES users(u_id) ON DELETE CASCADE,
    c_product_id BIGINT NOT NULL REFERENCES products(p_id) ON DELETE CASCADE,
    c_quantity INTEGER NOT NULL DEFAULT 1 CHECK (c_quantity > 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unq_user_product UNIQUE (c_user_id, c_product_id)
);

CREATE INDEX idx_cart_user ON cart_items(c_user_id);
CREATE INDEX idx_cart_product ON cart_items(c_product_id);

-- ----------------------------------------------
-- ORDERS TABLE
-- ----------------------------------------------
CREATE TABLE orders (
    o_id BIGSERIAL PRIMARY KEY,
    o_customer_id BIGINT NOT NULL REFERENCES users(u_id) ON DELETE CASCADE,

    o_subtotal DECIMAL(10, 2) NOT NULL CHECK (o_subtotal >= 0),
    o_tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (o_tax_amount >= 0),
    o_shipping_amount DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (o_shipping_amount >= 0),
    o_discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (o_discount_amount >= 0),
    o_total_amount DECIMAL(10, 2) NOT NULL CHECK (o_total_amount >= 0),

    o_status VARCHAR(50) NOT NULL DEFAULT 'PENDING'
        CHECK (o_status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED')),

    o_shipping_address TEXT NOT NULL,
    o_shipping_city VARCHAR(100) NOT NULL,
    o_shipping_postal_code VARCHAR(20) NOT NULL,
    o_shipping_country VARCHAR(100) NOT NULL,

    o_payment_method VARCHAR(50) NOT NULL CHECK (o_payment_method IN ('ONLINE', 'CARD', 'CASH')),

    customer_notes TEXT,
    admin_notes TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    o_completed_at TIMESTAMP
);

CREATE INDEX idx_orders_customer ON orders(o_customer_id);
CREATE INDEX idx_orders_status ON orders(o_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_completed_at ON orders(o_completed_at);

-- ----------------------------------------------
-- Order_Items Table
-- ----------------------------------------------
CREATE TABLE order_items (
    ot_id BIGSERIAL PRIMARY KEY,
    ot_order_id BIGINT NOT NULL REFERENCES orders(o_id) ON DELETE CASCADE,
    ot_product_id BIGINT NOT NULL REFERENCES products(p_id) ON DELETE CASCADE,

    ot_quantity INTEGER NOT NULL CHECK (ot_quantity > 0),
    ot_unit_price DECIMAL(10, 2) NOT NULL CHECK (ot_unit_price >= 0),
    ot_subtotal DECIMAL(10, 2) NOT NULL CHECK (ot_subtotal >= 0),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order ON order_items(ot_order_id);
CREATE INDEX idx_order_items_product ON order_items(ot_product_id);
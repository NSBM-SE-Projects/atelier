-- Migration Script: Add Cart Tables
-- This script adds the carts and cart_items tables to the existing database
-- Run this script if you already have data in the database that you want to preserve

-- Step 1: Drop old tables if they exist (to recreate with correct schema)
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;

-- Step 2: Create CARTS table
CREATE TABLE carts (
    ct_id BIGSERIAL PRIMARY KEY,
    ct_session_id VARCHAR(255) NOT NULL UNIQUE,
    ct_total_price DECIMAL(10, 2) DEFAULT 0 CHECK (ct_total_price >= 0),
    ct_item_count INTEGER DEFAULT 0 CHECK (ct_item_count >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_carts_session_id ON carts(ct_session_id);

CREATE TABLE cart_items (
    ci_id BIGSERIAL PRIMARY KEY,
    ci_cart_id BIGINT NOT NULL REFERENCES carts(ct_id) ON DELETE CASCADE,
    ci_product_id BIGINT NOT NULL REFERENCES products(p_id) ON DELETE CASCADE,
    ci_quantity INTEGER NOT NULL DEFAULT 1 CHECK (ci_quantity > 0),
    ci_unit_price DECIMAL(10, 2) NOT NULL CHECK (ci_unit_price >= 0),
    ci_total_price DECIMAL(10, 2) NOT NULL CHECK (ci_total_price >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unq_cart_product UNIQUE (ci_cart_id, ci_product_id)
);

CREATE INDEX idx_cart_items_cart ON cart_items(ci_cart_id);
CREATE INDEX idx_cart_items_product ON cart_items(ci_product_id);

-- Step 4: Verify tables were created successfully
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name IN ('carts', 'cart_items')
ORDER BY table_name;

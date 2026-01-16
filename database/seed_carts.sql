-- Seed Script: Sample Data for Carts and Cart Items
-- This script adds sample shopping cart data for testing

-- Step 1: Insert sample carts with different session IDs
INSERT INTO carts (ct_session_id, ct_total_price, ct_item_count, created_at, updated_at)
VALUES
    ('session-user-1-abc123def456', 65.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('session-user-2-xyz789uvw012', 130.00, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('session-user-3-qwe345rty678', 92.00, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('session-guest-4-asd901fgh234', 45.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('session-guest-5-zxc567bnm890', 157.00, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Step 2: Insert sample cart items
-- Cart 1: 1 Classic Cotton T-Shirt (product ID 1)
INSERT INTO cart_items (ci_cart_id, ci_product_id, ci_quantity, ci_unit_price, ci_total_price, created_at, updated_at)
VALUES
    (1, 1, 1, 25.00, 25.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Cart 2: 1 Slim Fit Denim Jeans (product ID 2) + 1 Casual Button-Down Shirt (product ID 3)
INSERT INTO cart_items (ci_cart_id, ci_product_id, ci_quantity, ci_unit_price, ci_total_price, created_at, updated_at)
VALUES
    (2, 2, 1, 65.00, 65.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 3, 1, 45.00, 45.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Cart 3: 1 Plain Summer Dress (product ID 6) + 2 Summer Floral Dress (product ID 7) + 1 Leather Crossbody Bag (product ID 16)
INSERT INTO cart_items (ci_cart_id, ci_product_id, ci_quantity, ci_unit_price, ci_total_price, created_at, updated_at)
VALUES
    (3, 6, 1, 75.00, 75.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 7, 2, 42.00, 84.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Cart 4: 1 Kids Graphic T-Shirt (product ID 11)
INSERT INTO cart_items (ci_cart_id, ci_product_id, ci_quantity, ci_unit_price, ci_total_price, created_at, updated_at)
VALUES
    (4, 11, 1, 18.00, 18.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Cart 5: 1 Canvas Backpack (product ID 17) + 1 Gift Voucher - $50 (product ID 20)
INSERT INTO cart_items (ci_cart_id, ci_product_id, ci_quantity, ci_unit_price, ci_total_price, created_at, updated_at)
VALUES
    (5, 17, 1, 65.00, 65.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 20, 1, 50.00, 50.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Step 3: Verify data was inserted
SELECT 'Carts' as table_name, COUNT(*) as row_count FROM carts
UNION ALL
SELECT 'Cart Items' as table_name, COUNT(*) as row_count FROM cart_items;

-- Step 4: Show cart details with items
SELECT
    c.ct_id,
    c.ct_session_id,
    c.ct_item_count,
    c.ct_total_price,
    COUNT(ci.ci_id) as actual_item_count,
    SUM(ci.ci_total_price) as actual_total_price
FROM carts c
LEFT JOIN cart_items ci ON c.ct_id = ci.ci_cart_id
GROUP BY c.ct_id, c.ct_session_id, c.ct_item_count, c.ct_total_price
ORDER BY c.ct_id;

-- Atelier Fashion Store - Sample Data

-- ----------------------------------------------
-- USERS (Customers and Staff)
-- ----------------------------------------------
INSERT INTO users (u_type, u_email, u_username, u_password, u_fullName, u_phone, u_address, u_city, u_postal_code, u_country, u_is_active) VALUES
-- Customers
('CUSTOMER', 'yameesha@example.com', 'yameesha', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG13AHN/Y.pVz4d7qK', 'Yameesha Dobby', '+94771234567', '12, Galle Road', 'Colombo', '00300', 'Sri Lanka', true),
('CUSTOMER', 'thiranya@example.com', 'thiranya', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG13AHN/Y.pVz4d7qK', 'Thiranya Bobby', '+94772345678', '456, Kandy Road', 'Kandy', '20000', 'Sri Lanka', true),
('CUSTOMER', 'sewwandi@example.com', 'sewwandi', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG13AHN/Y.pVz4d7qK', 'Sewwandi Jackson', '+94773456789', '789, Negombo Road', 'Negombo', '11500', 'Sri Lanka', true),
('CUSTOMER', 'nisith@example.com', 'nisith', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG13AHN/Y.pVz4d7qK', 'Nisith Williams', '+94774567890', '321, Gampaha Road', 'Gampaha', '11000', 'Sri Lanka', true),

-- Staff
('STAFF', 'adminThamindu@atelier.com', 'adminThamindu', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG13AHN/Y.pVz4d7qK', 'Admin Thamindu', '+94775678901', '223, Pannipitiya Road', 'Colombo', '00400', 'Sri Lanka', true),
('STAFF', 'staffAshen@atelier.com', 'staffAshen', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG13AHN/Y.pVz4d7qK', 'Staff Ashen', '+94776789012', '43, Kottawa Road', 'Colombo', '05670', 'Sri Lanka', true);

-- ----------------------------------------------
-- CATEGORIES
-- ----------------------------------------------
INSERT INTO categories (c_name, c_description) VALUES
('Men', 'Men''s clothing and apparel'),
('Women', 'Women''s clothing and apparel'),
('Kids', 'Kid''s clothing and apparel'),
('Accessories', 'Bags, belts, hats, and jewelry'),
('Gifts', 'Gift Vouchers and items');

-- ----------------------------------------------
-- PRODUCTS
-- ----------------------------------------------

-- Men's Clothing
INSERT INTO products (p_category_id, p_name, p_description, p_sku, p_price, p_cost_price, p_stock_quantity, p_size, p_color, p_gender, p_image_url, p_is_active, p_is_featured, p_created_by) VALUES
(1, 'Classic Cotton T-Shirt', 'Comfortable everyday cotton t-shirt', 'MEN-TSH-001', 25.00, 12.00, 150, 'L', 'White', 'MEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768453943/photo-1521572163474-6864f9cf17ab_gqefog.jpg', true, true, 6),
(1, 'Slim Fit Denim Jeans', 'Classic blue denim jeans with stretch', 'MEN-JNS-001', 65.00, 35.00, 80, 'M', 'Blue', 'MEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768453943/photo-1542272604-787c3835535d_jm43tz.jpg', true, true, 6),
(1, 'Casual Button-Down Shirt', 'Long sleeve casual shirt', 'MEN-SHT-001', 45.00, 23.00, 100, 'M', 'Light Blue', 'MEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768453947/photo-1596755094514-f87e34085b2c_ifkqqd.jpg', true, false, 6),
(1, 'Hooded Sweatshirt', 'Comfortable pullover hoodie', 'MEN-HOD-001', 55.00, 28.00, 90, 'XL', 'Off White', 'MEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768453944/photo-1556821840-3a63f95609a7_nmzwwe.jpg', true, false, 6),
(1, 'Chino Pants', 'Smart casual chino trousers', 'MEN-CHN-001', 52.00, 26.00, 70, 'L', 'Beige', 'MEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768453945/photo-1473966968600-fa801b869a1a_hscfe8.jpg', true, false, 6);

-- Women's Clothing
INSERT INTO products (p_category_id, p_name, p_description, p_sku, p_price, p_cost_price, p_stock_quantity, p_size, p_color, p_gender, p_image_url, p_is_active, p_is_featured, p_created_by) VALUES
(2, 'Plain Summer Dress', 'Light and breezy plain dress', 'WMN-DRS-001', 75.00, 38.00, 60, 'M', 'Red', 'WOMEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454261/photo-1595777457583-95e059d581b8_cicwka.jpg', true, true, 6),
(2, 'Summer Floral Dress', 'Lightweight floral print summer dress perfect for warm days', 'WMN-DRS-002', 42.00, 21.00, 92, 'M', 'Blue', 'WOMEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454274/3354c053-a613-4b00-9c06-eeec24fb0afe.jpg_advn7n.webp', true, false, 6),
(2, 'High-Waist Skinny Jeans', 'Trendy high-rise denim jeans', 'WMN-JNS-001', 68.00, 34.00, 75, 'M', 'Blue', 'WOMEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454257/photo-1541840031508-326b77c9a17e_moyamo.jpg', true, true, 6),
(2, 'Casual Shirt', 'Comfortable everyday shirt', 'WMN-TSH-001', 22.00, 11.00, 120, 'M', 'Light Blue', 'WOMEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454499/cbde803e-38c3-4868-ac2b-bb13d872df70_cjhjxf.webp', true, false, 6),
(2, 'Knit Cardigan', 'Cozy button-up cardigan', 'WMN-CRD-001', 62.00, 31.00, 55, 'L', 'White', 'WOMEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454498/beBpuIJx_6227a80aa182457ab6974c376f81adcd_lnxqnb.jpg', true, false, 6);

-- Kids Clothing
INSERT INTO products (p_category_id, p_name, p_description, p_sku, p_price, p_cost_price, p_stock_quantity, p_size, p_color, p_gender, p_image_url, p_is_active, p_is_featured, p_created_by) VALUES
(3, 'Kids Graphic T-Shirt', 'Fun printed t-shirt for kids', 'KID-TSH-001', 18.00, 9.00, 120, '8-10Y', 'Blue', 'KIDS', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454766/ChatGPT-Image-Oct-23-2025-04_06_37-PM-600x900_hyi59k.png', true, true, 6),
(3, 'Kids Denim Shorts', 'Comfortable summer shorts', 'KID-SHT-001', 25.00, 12.00, 95, '10-12Y', 'Blue', 'KIDS', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454753/images_jnr7hd.jpg', true, true, 6),
(3, 'Girls Floral Dress', 'Cute floral print dress for girls', 'KID-DRS-001', 32.00, 16.00, 75, '6-8Y', 'Pink', 'KIDS', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454731/9ef9e8f80b6aa81f4c6353e2efeac7ec_bqd75t.jpg', true, false, 6),
(3, 'Kids Hoodie', 'Warm and cozy hoodie', 'KID-HOD-001', 35.00, 18.00, 85, '10-12Y', 'Dark Blue', 'KIDS', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454773/image00005_1000x1500_38543512-776d-42b9-89f7-28ff34137e3a_sx0w0b.jpg', true, false, 6),
(3, 'Kids Joggers', 'Comfortable sweatpants for active kids', 'KID-JOG-001', 28.00, 14.00, 100, '8-10Y', 'Black', 'KIDS', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454738/005192071alt2_uqeu5s.jpg', true, false, 6);

-- Accessories
INSERT INTO products (p_category_id, p_name, p_description, p_sku, p_price, p_cost_price, p_stock_quantity, p_size, p_color, p_gender, p_image_url, p_is_active, p_is_featured, p_created_by) VALUES
(4, 'Leather Crossbody Bag', 'Compact leather crossbody bag', 'ACC-BAG-001', 85.00, 45.00, 45, 'One Size', 'Black', 'WOMEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454979/photo-1548036328-c9fa89d128fa_cnz0of.jpg', true, true, 6),
(4, 'Canvas Backpack', 'Durable everyday backpack', 'ACC-BAG-002', 65.00, 32.00, 70, 'One Size', 'Black', 'UNISEX', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454980/photo-1553062407-98eeb64c6a62_lamafp.jpg', true, true, 6),
(4, 'Leather Belt', 'Classic leather belt with silver buckle', 'ACC-BLT-001', 32.00, 16.00, 120, 'M', 'Brown', 'MEN', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454996/kjlgkl.png_bbfnmk.webp', true, false, 6),
(4, 'Trucker Cap', 'Cozy trucker cap', 'ACC-HAT-001', 28.00, 14.00, 150, 'One Size', 'White', 'UNISEX', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454965/photo-1588850561407-ed78c282e89b_bvbitq.jpg', true, false, 6),
(4, 'Aviator Sunglasses', 'Classic aviator style sunglasses', 'ACC-SNG-001', 45.00, 22.00, 80, 'One Size', 'Gold/Black', 'UNISEX', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768454980/photo-1511499767150-a48a237f0083_weo3xg.jpg', true, false, 6);

-- Gifts
INSERT INTO products (p_category_id, p_name, p_description, p_sku, p_price, p_cost_price, p_stock_quantity, p_size, p_color, p_gender, p_image_url, p_is_active, p_is_featured, p_created_by) VALUES
(5, 'Gift Voucher - $20', 'Atelier shopping gift voucher worth $20', 'GFT-VCH-50', 20.00, 20.00, 999, 'One Size', 'Black', 'UNISEX', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768455414/Screenshot_2026-01-15_at_11.02.38_zx6kti.png', true, true, 6),
(5, 'Gift Voucher - $50', 'Atelier shopping gift voucher worth $50', 'GFT-VCH-100', 50.00, 50.00, 999, 'One Size', 'Black', 'UNISEX', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768455415/Screenshot_2026-01-15_at_11.02.53_etilpp.png', true, false, 6),
(5, 'Gift Voucher - $100', 'Atelier shopping gift voucher worth $100', 'GFT-BOX-001', 100.00, 100.00, 50, 'One Size', 'Black', 'UNISEX', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768455419/Screenshot_2026-01-15_at_11.03.02_jxjql2.png', true, true, 6),
(5, 'Perfume Collection Set', 'Complete perfume collection gift set', 'GFT-SET-001', 85.00, 45.00, 65, 'One Size', 'Multi', 'UNISEX', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768455443/W14806s.jpg_bpzhwg.webp', true, false, 6),
(5, 'Luxury Scarf Set', 'Premium silk scarf and beanie in gift packaging', 'GFT-SCF-001', 65.00, 32.00, 80, 'One Size', 'Black', 'UNISEX', 'https://res.cloudinary.com/dclidhsza/image/upload/v1768455421/0c1f1f6e-e42c-40f2-999f-85437d0ebc34_cfspto.webp', true, false, 6);

-- ----------------------------------------------
-- CART ITEMS
-- ----------------------------------------------

-- Yameesha's cart
INSERT INTO cart_items (c_user_id, c_product_id, c_quantity) VALUES
(1, 2, 1),  -- Slim Fit Denim Jeans
(1, 12, 1); -- Denim Shorts (Kids)

-- Thiranya's cart
INSERT INTO cart_items (c_user_id, c_product_id, c_quantity) VALUES
(2, 6, 2),  -- Plain Summer Dress x2
(2, 16, 1); -- Leather Crossbody Bag

-- Sewwandi's cart
INSERT INTO cart_items (c_user_id, c_product_id, c_quantity) VALUES
(3, 10, 3),  -- Knit Cardigan x3
(3, 19, 1); -- Trucker Cap

-- ----------------------------------------------
-- ORDERS
-- ----------------------------------------------

-- Order 1: Yameesha - Delivered
INSERT INTO orders (o_customer_id, o_subtotal, o_tax_amount, o_shipping_amount, o_discount_amount, o_total_amount, o_status, o_shipping_address, o_shipping_city, o_shipping_postal_code, o_shipping_country, o_payment_method, o_completed_at) VALUES
(1, 83.00, 8.30, 5.00, 0, 96.30, 'DELIVERED', '12, Galle Road', 'Colombo', '00300', 'Sri Lanka', 'CARD', NOW() - INTERVAL '3 days');

INSERT INTO order_items (ot_order_id, ot_product_id, ot_quantity, ot_unit_price, ot_subtotal) VALUES
(1, 11, 1, 18.00, 18.00),
(1, 2, 1, 65.00, 65.00);

-- Order 2: Thiranya - Processing
INSERT INTO orders (o_customer_id, o_subtotal, o_tax_amount, o_shipping_amount, o_discount_amount, o_total_amount, o_status, o_shipping_address, o_shipping_city, o_shipping_postal_code, o_shipping_country, o_payment_method) VALUES
(2, 235.00, 23.50, 5.00, 20.00, 243.50, 'PROCESSING', '456, Kandy Road', 'Kandy', '20000', 'Sri Lanka', 'CARD');

INSERT INTO order_items (ot_order_id, ot_product_id, ot_quantity, ot_unit_price, ot_subtotal) VALUES
(2, 6, 2, 75.00, 150.00),
(2, 16, 1, 85.00, 85.00);

-- Order 3: Sewwandi - Delivered
INSERT INTO orders (o_customer_id, o_subtotal, o_tax_amount, o_shipping_amount, o_discount_amount, o_total_amount, o_status, o_shipping_address, o_shipping_city, o_shipping_postal_code, o_shipping_country, o_payment_method, o_completed_at) VALUES
(3, 132.00, 13.20, 5.00, 15.00, 135.20, 'DELIVERED', '789, Negombo Road', 'Negombo', '11500', 'Sri Lanka', 'ONLINE', NOW() - INTERVAL '7 days');

INSERT INTO order_items (ot_order_id, ot_product_id, ot_quantity, ot_unit_price, ot_subtotal) VALUES
(3, 1, 3, 25.00, 75.00),
(3, 12, 1, 25.00, 25.00),
(3, 18, 1, 32.00, 32.00);

-- Order 4: Nisith - Confirmed
INSERT INTO orders (o_customer_id, o_subtotal, o_tax_amount, o_shipping_amount, o_discount_amount, o_total_amount, o_status, o_shipping_address, o_shipping_city, o_shipping_postal_code, o_shipping_country, o_payment_method) VALUES
(4, 100.00, 10.00, 5.00, 15.00, 100.00, 'CONFIRMED', '321, Gampaha Road', 'Gampaha', '11000', 'Sri Lanka', 'CASH');

INSERT INTO order_items (ot_order_id, ot_product_id, ot_quantity, ot_unit_price, ot_subtotal) VALUES
(4, 8, 1, 68.00, 68.00),
(4, 13, 1, 32.00, 32.00);

-- Order 5: Yameesha - Shipped
INSERT INTO orders (o_customer_id, o_subtotal, o_tax_amount, o_shipping_amount, o_discount_amount, o_total_amount, o_status, o_shipping_address, o_shipping_city, o_shipping_postal_code, o_shipping_country, o_payment_method) VALUES
(1, 115.00, 11.50, 5.00, 5.00, 126.50, 'SHIPPED', '12, Galle Road', 'Colombo', '00300', 'Sri Lanka', 'CARD');

INSERT INTO order_items (ot_order_id, ot_product_id, ot_quantity, ot_unit_price, ot_subtotal) VALUES
(5, 4, 1, 55.00, 55.00),
(5, 19, 1, 28.00, 28.00),
(5, 18, 1, 32.00, 32.00);

-- ==============================================
-- DATA SUMMARY
-- ==============================================
-- Total Users: 6
-- Total Categories: 5
-- Total Products: 25 
-- Total Active Carts: 3 
-- Total Orders: 5 
-- Total Order Items: 11

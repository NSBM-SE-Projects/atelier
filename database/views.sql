-- ----------------------------------------------
-- VIEWS FOR REPORTING
-- ----------------------------------------------

-- View: Order summary for sales reports
CREATE OR REPLACE VIEW v_order_summary AS
SELECT
    o.o_id as order_id,
    o.o_customer_id,
    u.u_fullName as customer_name,
    u.u_email as customer_email,
    o.o_total_amount,
    o.o_status,
    o.created_at as order_date,
    o.o_completed_at,
    COUNT(oi.ot_id) as total_items
FROM orders o
JOIN users u ON o.o_customer_id = u.u_id
LEFT JOIN order_items oi ON o.o_id = oi.ot_order_id
GROUP BY o.o_id, o.o_customer_id, u.u_fullName, u.u_email, o.o_total_amount,
         o.o_status, o.created_at, o.o_completed_at;

-- View: Product sales report
CREATE OR REPLACE VIEW v_product_sales AS
SELECT
    p.p_id as product_id,
    p.p_name as product_name,
    p.p_sku,
    c.c_name as category_name,
    COUNT(oi.ot_id) as times_sold,
    SUM(oi.ot_quantity) as total_quantity_sold,
    SUM(oi.ot_subtotal) as total_revenue,
    AVG(oi.ot_unit_price) as average_selling_price,
    p.p_stock_quantity as current_stock
FROM products p
LEFT JOIN categories c ON p.p_category_id = c.c_id
LEFT JOIN order_items oi ON p.p_id = oi.ot_product_id
LEFT JOIN orders o ON oi.ot_order_id = o.o_id AND o.o_status != 'CANCELLED'
GROUP BY p.p_id, p.p_name, p.p_sku, c.c_name, p.p_stock_quantity
ORDER BY total_revenue DESC;

-- View: Customer purchase history
CREATE OR REPLACE VIEW v_customer_purchases AS
SELECT
    u.u_id as customer_id,
    u.u_fullName as customer_name,
    u.u_email as customer_email,
    COUNT(o.o_id) as total_orders,
    SUM(o.o_total_amount) as lifetime_value,
    MAX(o.created_at) as last_order_date,
    AVG(o.o_total_amount) as average_order_value
FROM users u
LEFT JOIN orders o ON u.u_id = o.o_customer_id AND o.o_status != 'CANCELLED'
WHERE u.u_type = 'CUSTOMER'
GROUP BY u.u_id, u.u_fullName, u.u_email
ORDER BY lifetime_value DESC;
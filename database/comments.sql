-- ----------------------------------------------
-- COMMENTS FOR TABLES
-- ----------------------------------------------
COMMENT ON TABLE users IS 'User accounts with single-table inheritance (Customer/Staff)';
COMMENT ON TABLE categories IS 'Fashion product categories: Men, Women, Footwear, Accessories';
COMMENT ON TABLE products IS 'Fashion product catalog with inventory management';
COMMENT ON TABLE cart_items IS 'Shopping cart items before checkout';
COMMENT ON TABLE orders IS 'Completed purchase orders';
COMMENT ON TABLE order_items IS 'Line items in each order';

COMMENT ON COLUMN users.u_type IS 'Discriminator for inheritance: CUSTOMER or STAFF';
COMMENT ON COLUMN orders.o_status IS 'Order lifecycle state';
COMMENT ON COLUMN orders.o_payment_method IS 'Payment method: ONLINE, CARD, or CASH';

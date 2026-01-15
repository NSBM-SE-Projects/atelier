-- Complete database reset and seed script

-- Step 1: Clear all existing data
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE cart_items CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE users CASCADE;

-- Reset sequences to start from 1
ALTER SEQUENCE users_u_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_c_id_seq RESTART WITH 1;
ALTER SEQUENCE products_p_id_seq RESTART WITH 1;
ALTER SEQUENCE cart_items_c_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_o_id_seq RESTART WITH 1;
ALTER SEQUENCE order_items_ot_id_seq RESTART WITH 1;

-- Add o_order_number column to orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS o_order_number VARCHAR(50) UNIQUE;

-- Create index on o_order_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(o_order_number);

-- Update existing orders with generated order numbers (if any exist)
UPDATE orders
SET o_order_number = 'ORD-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8))
WHERE o_order_number IS NULL;

-- Make o_order_number NOT NULL after populating existing records
ALTER TABLE orders
ALTER COLUMN o_order_number SET NOT NULL;

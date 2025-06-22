-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on name for faster searches
CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);

-- Insert some sample data
INSERT INTO items (name, description, price, category) VALUES
    ('Laptop', 'High-performance laptop for work', 999.99, 'Electronics'),
    ('Coffee Mug', 'Ceramic coffee mug', 12.50, 'Kitchen'),
    ('Running Shoes', 'Comfortable running shoes', 89.99, 'Sports'),
    ('Book: Python Programming', 'Learn Python programming', 45.00, 'Books'),
    ('Desk Lamp', 'LED desk lamp with adjustable brightness', 34.99, 'Home')
ON CONFLICT DO NOTHING; 
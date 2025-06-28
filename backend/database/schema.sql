-- Create db tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    purchase_date TIMESTAMP NOT NULL,
    store VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);

-- Create index on email for faster login lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert some sample data
INSERT INTO users (id, full_name, email, password_hash) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Demo User', 'demo@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJgHqK2')
ON CONFLICT DO NOTHING;

INSERT INTO items (purchase_date, user_id, store, amount, category) VALUES
    ('2025-06-18', '11111111-1111-1111-1111-111111111111', 'Best Buy', 999.99, 'Electronics'),
    ('2025-06-18', '11111111-1111-1111-1111-111111111111', 'Kohls', 12.50, 'Kitchen'),
    ('2025-06-20', '11111111-1111-1111-1111-111111111111', 'Dicks Sporting Goods', 89.99, 'Sports'),
    ('2025-06-23', '11111111-1111-1111-1111-111111111111', 'Barnes & Noble', 45.00, 'Books'),
    ('2025-06-23', '11111111-1111-1111-1111-111111111111', 'Walmart', 34.99, 'Home')
ON CONFLICT DO NOTHING;
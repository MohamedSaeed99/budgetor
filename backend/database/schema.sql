DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS tabs;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    section_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS tabs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
    tab_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tab_id UUID REFERENCES tabs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    purchase_date TIMESTAMP NOT NULL,
    store VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_purchase_category ON purchases(category);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_purchase_created_at ON purchases(created_at);

-- Create index on email for faster login lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert some sample data
INSERT INTO users (id, full_name, email, password_hash) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Demo User', 'demo@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJgHqK2')
ON CONFLICT DO NOTHING;

-- Insert initial sections for the demo user
INSERT INTO sections (id, user_id, section_name) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Overview')
ON CONFLICT DO NOTHING;

-- Insert initial tabs for the demo user, referencing the above section IDs
INSERT INTO tabs (id, user_id, section_id, tab_name) VALUES
    ('aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Jan')
ON CONFLICT DO NOTHING;

INSERT INTO purchases (purchase_date, tab_id, user_id, store, amount, category) VALUES
    ('2025-06-18', 'aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd', '11111111-1111-1111-1111-111111111111', 'Best Buy', 999.99, 'Electronics'),
    ('2025-06-18', 'aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd', '11111111-1111-1111-1111-111111111111', 'Kohls', 12.50, 'Kitchen'),
    ('2025-06-20', 'aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd', '11111111-1111-1111-1111-111111111111', 'Dicks Sporting Goods', 89.99, 'Sports'),
    ('2025-06-23', 'aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd', '11111111-1111-1111-1111-111111111111', 'Barnes & Noble', 45.00, 'Books'),
    ('2025-06-23', 'aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd', '11111111-1111-1111-1111-111111111111', 'Walmart', 34.99, 'Home')
ON CONFLICT DO NOTHING;
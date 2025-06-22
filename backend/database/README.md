# Database Setup Guide

This guide will help you set up PostgreSQL for your Budgetor application.

## Prerequisites

1. **Install PostgreSQL** on your system:
   - Windows: Download from https://www.postgresql.org/download/windows/
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql postgresql-contrib`

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Setup Steps

### 1. Create a PostgreSQL Database

1. Start PostgreSQL service
2. Create a new database:
   ```sql
   CREATE DATABASE budgetor;
   ```

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` with your database credentials:
   ```env
   DB_NAME=budgetor
   DB_USER=postgres
   DB_PASSWORD=your_actual_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

### 3. Initialize the Database

Run the database initialization script:
```bash
python database/init_db.py
```

This will:
- Create the `items` table
- Add indexes for better performance
- Insert sample data

### 4. Test the Connection

You can test the database connection by running:
```bash
python database/connection.py
```

Or check the health endpoint in your FastAPI app:
```bash
curl http://localhost:8000/item/health/db
```

## Usage

### Basic Database Operations

The connection module provides several helper functions:

```python
from database.connection import execute_query, get_connection, return_connection

# Execute a simple query
result = execute_query("SELECT * FROM items", fetch_all=True)

# Execute with parameters
result = execute_query("SELECT * FROM items WHERE category = %s", 
                      params=("Electronics",), fetch_all=True)

# Insert data
execute_query("INSERT INTO items (name, price) VALUES (%s, %s)", 
             params=("New Item", 29.99))
```

### Connection Pooling

The application uses connection pooling for better performance:
- Minimum connections: 1
- Maximum connections: 10
- Connections are automatically managed

### Error Handling

All database operations include error handling:
- Connection failures are logged
- Query errors trigger rollbacks
- HTTP 500 errors for database issues

## API Endpoints

Once set up, you can use these endpoints:

- `GET /item/` - Get all items
- `GET /item/{id}` - Get specific item
- `POST /item/` - Create new item
- `PATCH /item/{id}` - Update item
- `DELETE /item/{id}` - Delete item
- `GET /item/health/db` - Check database health

## Troubleshooting

### Common Issues

1. **Connection refused**: Make sure PostgreSQL is running
2. **Authentication failed**: Check username/password in `.env`
3. **Database doesn't exist**: Create the database first
4. **Permission denied**: Ensure your user has proper permissions

### Debug Mode

To see detailed database logs, you can modify the connection.py file to include more verbose logging.

## Security Notes

- Never commit `.env` files to version control
- Use strong passwords for production databases
- Consider using SSL connections for production
- Regularly update PostgreSQL and dependencies 
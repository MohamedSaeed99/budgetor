import os
import psycopg2
from psycopg2 import pool
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database configuration from environment variables
DB_CONFIG = {
    'database': os.getenv('DB_NAME', 'budgetor'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'password'),
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432')
}

# Connection pool configuration
POOL_CONFIG = {
    'minconn': int(os.getenv('DB_MIN_CONNECTIONS', '1')),
    'maxconn': int(os.getenv('DB_MAX_CONNECTIONS', '10')),
    **DB_CONFIG
}

# Create connection pool
try:
    connection_pool = psycopg2.pool.SimpleConnectionPool(**POOL_CONFIG)
    print("Database connection pool created successfully")
except psycopg2.Error as e:
    print(f"Error creating connection pool: {e}")
    connection_pool = None

def get_connection():
    """Get a connection from the pool"""
    if connection_pool:
        try:
            return connection_pool.getconn()
        except psycopg2.Error as e:
            print(f"Error getting connection from pool: {e}")
            return None
    return None

def return_connection(conn):
    """Return a connection to the pool"""
    if connection_pool and conn:
        try:
            connection_pool.putconn(conn)
        except psycopg2.Error as e:
            print(f"Error returning connection to pool: {e}")

def execute_query(query, params=None, fetch_one=False, fetch_all=False):
    """Execute a query and return results"""
    conn = get_connection()
    if not conn:
        return None
    
    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(query, params)
        
        if fetch_one:
            result = cursor.fetchone()
        elif fetch_all:
            result = cursor.fetchall()
        else:
            conn.commit()
            result = cursor.rowcount
        
        cursor.close()
        return result
    
    except psycopg2.Error as e:
        print(f"Database error: {e}")
        conn.rollback()
        return None
    finally:
        return_connection(conn)

def test_connection():
    """Test the database connection"""
    try:
        conn = get_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            cursor.close()
            return_connection(conn)
            print(f"Database connection successful. PostgreSQL version: {version[0]}")
            return True
        else:
            print("Failed to get database connection")
            return False
    except Exception as e:
        print(f"Connection test failed: {e}")
        return False

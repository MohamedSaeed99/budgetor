import os
from database.database import execute_query, test_connection

def init_database():
    """Initialize the database with schema and sample data"""
    
    # Test connection first
    if not test_connection():
        print("Failed to connect to database. Please check your configuration.")
        return False
    
    # Read and execute schema file
    schema_file = os.path.join(os.path.dirname(__file__), 'schema.sql')
    
    try:
        with open(schema_file, 'r') as f:
            schema_sql = f.read()
        
        # Split the SQL file into individual statements
        statements = schema_sql.split(';')
        
        for statement in statements:
            statement = statement.strip()
            if statement:  # Skip empty statements
                result = execute_query(statement)
                if result is None:
                    print(f"Error executing statement: {statement[:50]}...")
                    return False
        
        print("Database initialized successfully!")
        return True
        
    except FileNotFoundError:
        print(f"Schema file not found: {schema_file}")
        return False
    except Exception as e:
        print(f"Error initializing database: {e}")
        return False

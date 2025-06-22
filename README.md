# Budgetor

Budgetor is a full-stack web application designed to help you track your personal or household budget. It allows you to record, categorize, and visualize your expenses, making it easier to manage your finances and gain insights into your spending habits.

## Features
- Add, update, and delete expense items
- Categorize expenses (e.g., groceries, utilities, entertainment)
- Visualize spending with charts and summaries
- Fast, modern web interface
- Secure and scalable backend with PostgreSQL

## Tech Stack
- **Frontend:** React (with TypeScript, Vite)
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL

## Project Structure
```
budgetor/
  backend/    # FastAPI backend, database, and API
  frontend/   # React frontend (Vite, TypeScript)
```

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Python 3.8+ (for backend)
- PostgreSQL (for database)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy and configure environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```
4. Initialize the database:
   ```bash
   python database/init_db.py
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Accessing the App
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

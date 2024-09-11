# AgileBudhi Project Setup and Run Guide

## Prerequisites
- Python 3.7+
- Node.js and npm
- PostgreSQL database
- Supabase account

## Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```
   cd AgileBudhi/backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`

4. Install the required packages:
   ```
   pip install fastapi[all] sqlalchemy psycopg2-binary
   ```

5. Set up your database URL as an environment variable:
   - On Windows: `set DATABASE_URL=postgresql://user:password@localhost/agilebudhi`
   - On macOS and Linux: `export DATABASE_URL=postgresql://user:password@localhost/agilebudhi`

6. Update the `SQLALCHEMY_DATABASE_URL` in `app/database.py` to use the environment variable:
   ```python
   import os
   SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
   ```

7. Run the FastAPI server:
   ```
   uvicorn app.main:app --reload
   ```

Your backend should now be running at `http://127.0.0.1:8000`.

## Frontend Setup (React)

1. Navigate to the frontend directory:
   ```
   cd AgileBudhi/frontend
   ```

2. Install the required packages:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory and add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the React development server:
   ```
   npm start
   ```

Your frontend should now be running at `http://localhost:3000`.

## Supabase Setup

1. Log in to your Supabase account and create a new project.

2. In the Supabase dashboard, go to the SQL editor and create a `projects` table:
   ```sql
   CREATE TABLE projects (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     status VARCHAR(50) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. Update the Supabase URL and anon key in your frontend `.env` file with the values from your Supabase project settings.

## Running the Entire Application

1. Start the backend server (if not already running):
   ```
   cd AgileBudhi/backend
   uvicorn app.main:app --reload
   ```

2. In a new terminal, start the frontend development server (if not already running):
   ```
   cd AgileBudhi/frontend
   npm start
   ```

3. Open your web browser and go to `http://localhost:3000` to see your AgileBudhi application in action.

Remember to keep both the backend and frontend servers running while you're working on the application.
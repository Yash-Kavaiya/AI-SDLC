#!/bin/bash

# Create main project directory
mkdir AgileBudhi
cd AgileBudhi

# Backend setup
mkdir backend
cd backend
mkdir app
touch app/__init__.py
touch app/main.py
touch app/models.py
touch app/schemas.py
touch app/database.py
touch app/crud.py
touch requirements.txt
cd ..

# Frontend setup
npx create-react-app frontend
cd frontend
npm install @supabase/supabase-js
cd ..

# Create a docker-compose file
touch docker-compose.yml

echo "Project structure created successfully!"
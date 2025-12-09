#!/bin/bash

set -e

echo "Starting cargoful interview app..."

# -----------------------
# 1. Check prerequisites and install if missing
# -----------------------
if ! command -v python3 >/dev/null 2>&1; then
    echo "Python3 not found. Please install Python3 and re-run the script."
    exit 1
fi

if ! command -v pip >/dev/null 2>&1; then
    echo "pip not found. Please install pip and re-run the script."
    exit 1
fi

if ! command -v node >/dev/null 2>&1; then
    echo "Node.js not found. Installing via nvm..."
    # Requires nvm installed
    if command -v nvm >/dev/null 2>&1; then
        nvm install node
    else
        echo "Please install Node.js manually or install nvm first."
        exit 1
    fi
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "npm not found. Please install npm and re-run the script."
    exit 1
fi

# -----------------------
# 2. Setup Python venv
# -----------------------
echo "Setting up Python virtual environment..."
python3 -m venv .venv
source .venv/bin/activate

# -----------------------
# 3. Install Python deps from requirements.txt
# -----------------------
if [ ! -f "requirements.txt" ]; then
    echo "requirements.txt not found! Creating default one..."
    echo "django" > requirements.txt
    echo "djangorestframework" >> requirements.txt
fi

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# -----------------------
# 4. Setup frontend (Vite + React + MUI)
# -----------------------
if [ ! -d "frontend" ]; then
    echo "Creating frontend (Vite + React + TS)..."
    npm create vite@latest frontend -- --template react-ts
fi

echo "Installing frontend dependencies..."
cd frontend
npm install

# Install MUI and date picker dependencies
npm install @mui/material @mui/icons-material @mui/x-date-pickers dayjs

cd ..

# -----------------------
# 5. Run Django migrations
# -----------------------
echo "Running Django migrations..."
source .venv/bin/activate
python manage.py migrate || echo "No migrations to run"

# -----------------------
# 6. Start backend and frontend servers
# -----------------------
echo "Starting backend server on http://127.0.0.1:8000 ..."
nohup python manage.py runserver &

echo "Starting frontend dev server on http://localhost:5173 ..."
cd frontend
npm run dev

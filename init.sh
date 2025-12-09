#!/bin/bash

set -e

echo "=== Starting fullstack bootstrap ==="

check_cmd() {
    if ! command -v "$1" >/dev/null 2>&1; then
        echo "❌ $1 not found. Please install it first."
        exit 1
    fi
}

# -----------------------
# 1. Check prerequisites
# -----------------------
echo "Checking dependencies..."

check_cmd python3
check_cmd pip
check_cmd node
check_cmd npm

# -----------------------
# 2. Setup BACKEND
# -----------------------
echo "=== Backend setup ==="

if [ ! -d "backend" ]; then
    echo "backend folder not found."
    exit 1
fi

cd backend

# 2A — Virtual environment
if [ ! -d ".venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv .venv
else
    echo "Virtual environment already exists."
fi

source .venv/bin/activate

# 2B — requirements.txt
if [ ! -f "requirements.txt" ]; then
    echo "Creating default requirements.txt..."
    cat <<EOF > requirements.txt
django
djangorestframework
django-cors-headers
EOF
else
    echo "requirements.txt already exists."
fi

echo "Installing backend dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# 2C — Django migration
if [ -f "manage.py" ]; then
    echo "Running Django migrations..."
    python manage.py migrate || echo "No migrations to run"
else
    echo "⚠️ manage.py not found in backend/"
fi

cd ..

# -----------------------
# 3. Setup FRONTEND
# -----------------------
echo "=== Frontend setup ==="

if [ ! -d "frontend" ]; then
    echo "Creating Vite + React + TS frontend..."
    nvm use 22
    npm create vite@latest frontend -- --template react-ts
else
    echo "Frontend folder already exists."
fi

cd frontend

echo "Installing frontend dependencies..."
# nvm use 22
read -p "Press [Enter] to install frontend dependencies..."
echo "Installing MUI, date pickers, and dayjs..."
# npm install @mui/material @mui/icons-material @mui/x-date-pickers dayjs

cd ..

# -----------------------
# 4. Start servers
# -----------------------
echo "=== Starting backend and frontend ==="

read -p "Press [Enter] to start the servers..."

echo "Starting Django server at http://127.0.0.1:8000 ..."
cd backend
source .venv/bin/activate
nohup python manage.py runserver > ../backend.log 2>&1 &
cd ..

read -p

echo "Starting Vite dev server at http://localhost:5173 ..."
cd frontend
# npm run dev

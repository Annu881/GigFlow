#!/bin/bash

# GigFlow Quick Start Script

echo "🚀 Starting GigFlow Application..."
echo ""

# Start MongoDB
echo "📦 Starting MongoDB..."
sudo systemctl start mongod
sleep 2

# Check MongoDB status
if systemctl is-active --quiet mongod; then
    echo "✅ MongoDB started successfully"
else
    echo "❌ MongoDB failed to start. Please run: sudo systemctl start mongod"
    exit 1
fi

# Start Backend
echo ""
echo "🔧 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Start Frontend
echo ""
echo "🎨 Starting Frontend Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "✅ GigFlow is starting up!"
echo ""
echo "📍 Backend: http://localhost:5000"
echo "📍 Frontend: http://localhost:5174"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
wait

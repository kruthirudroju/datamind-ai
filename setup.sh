#!/bin/bash

echo "🚀 Starting DataMind AI installation..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Copy environment template if it doesn't exist
if [ ! -f frontend/.env ]; then
  echo "📄 Creating .env file from template..."
  cp frontend/.env.example frontend/.env
fi

# Start local database
if command -v docker-compose &> /dev/null; then
  echo "🐳 Starting Docker database container..."
  docker-compose up -d
fi

echo "✅ Setup complete! Run 'cd frontend && npm run dev' to start the application."

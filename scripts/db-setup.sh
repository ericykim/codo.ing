#!/bin/bash
# Database setup script for Codo.ing

set -e

# Load environment variables
if [ -f .env ]; then
    source .env
fi

# Set defaults if not provided
POSTGRES_DB=${POSTGRES_DB:-codoing}
POSTGRES_USER=${POSTGRES_USER:-postgres}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres}
POSTGRES_HOST=${POSTGRES_HOST:-localhost}
POSTGRES_PORT=${POSTGRES_PORT:-5432}

echo "🐳 Setting up PostgreSQL with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start PostgreSQL container
echo "📦 Starting PostgreSQL container..."
docker compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
timeout=30
counter=0

while ! docker compose exec postgres pg_isready -U $POSTGRES_USER > /dev/null 2>&1; do
    if [ $counter -eq $timeout ]; then
        echo "❌ PostgreSQL failed to start within $timeout seconds"
        exit 1
    fi
    counter=$((counter + 1))
    sleep 1
done

echo "✅ PostgreSQL is ready!"
echo "📊 Database: $POSTGRES_DB"
echo "👤 User: $POSTGRES_USER"
echo "🔑 Password: $POSTGRES_PASSWORD"
echo "🌐 Host: $POSTGRES_HOST:$POSTGRES_PORT"
echo ""
echo "🔗 Connection string: postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"
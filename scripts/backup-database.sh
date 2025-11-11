#!/bin/bash

# Database Backup Script for Supabase
# This script creates a backup of the Supabase PostgreSQL database

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Supabase Database Backup Script${NC}"
echo ""

# Load .env.local if it exists
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | grep -E 'DATABASE_URL|DIRECT_URL' | xargs)
fi

# Use DIRECT_URL if available, otherwise use DATABASE_URL
CONNECTION_URL="${DIRECT_URL:-$DATABASE_URL}"

# Check if connection URL is set
if [ -z "$CONNECTION_URL" ]; then
    echo -e "${RED}Error: DATABASE_URL or DIRECT_URL not set${NC}"
    exit 1
fi

# If using pooled connection (port 6543), convert to direct (port 5432)
if [[ "$CONNECTION_URL" == *":6543"* ]] || [[ "$CONNECTION_URL" == *"pooler"* ]]; then
    echo "Converting to direct connection (port 5432)..."
    # Replace username from postgres.PROJECT_REF to just postgres
    CONNECTION_URL=$(echo "$CONNECTION_URL" | sed 's/postgres\.mijwwnwvcngqdrrlfuge:/postgres:/')
    # Replace port 6543 with 5432 and pooler hostname with direct hostname
    CONNECTION_URL=$(echo "$CONNECTION_URL" | sed 's/:6543/:5432/' | sed 's/aws-0-[^.]*\.pooler\.supabase\.com/db.mijwwnwvcngqdrrlfuge.supabase.co/')
fi

# Create backup directory if it doesn't exist
BACKUP_DIR="./database-backups"
mkdir -p "$BACKUP_DIR"

# Generate backup filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/supabase_backup_$TIMESTAMP.sql"

echo -e "${YELLOW}Creating backup...${NC}"
echo "Backup file: $BACKUP_FILE"
echo ""

# Run pg_dump
pg_dump "$CONNECTION_URL" > "$BACKUP_FILE" 2> "${BACKUP_FILE}.error"
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    # Check if backup file has actual data
    FILE_SIZE=$(wc -c < "$BACKUP_FILE" | tr -d ' ')
    if [ "$FILE_SIZE" -lt 1000 ]; then
        echo -e "${RED}✗ Backup file is too small${NC}"
        if [ -f "${BACKUP_FILE}.error" ]; then
            cat "${BACKUP_FILE}.error"
        fi
        rm -f "$BACKUP_FILE" "${BACKUP_FILE}.error"
        exit 1
    fi
    
    # Verify backup contains data
    if grep -q "CREATE TABLE\|INSERT INTO\|COPY" "$BACKUP_FILE" 2>/dev/null; then
        FILE_SIZE_HR=$(du -h "$BACKUP_FILE" | cut -f1)
        TABLE_COUNT=$(grep -c "CREATE TABLE" "$BACKUP_FILE" 2>/dev/null || echo "0")
        echo -e "${GREEN}✓ Backup created successfully!${NC}"
        echo "  File: $BACKUP_FILE"
        echo "  Size: $FILE_SIZE_HR"
        echo "  Tables: $TABLE_COUNT"
        echo "  ✓ Verified: Contains database schema and data"
        echo ""
        echo -e "${YELLOW}To restore:${NC} psql \"\$DATABASE_URL\" < $BACKUP_FILE"
    else
        echo -e "${YELLOW}⚠ Backup created but may be empty${NC}"
    fi
    
    rm -f "${BACKUP_FILE}.error"
else
    echo -e "${RED}✗ Backup failed${NC}"
    if [ -f "${BACKUP_FILE}.error" ]; then
        cat "${BACKUP_FILE}.error"
        rm -f "${BACKUP_FILE}.error"
    fi
    rm -f "$BACKUP_FILE"
    exit 1
fi

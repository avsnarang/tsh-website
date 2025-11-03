#!/bin/bash

# Alternative Database Backup Script using psql
# This script creates a backup if pg_dump is not available

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Supabase Database Backup Script (using psql)${NC}"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}Error: DATABASE_URL environment variable is not set${NC}"
    echo ""
    echo "Please set DATABASE_URL in your .env.local file."
    echo "Load it with: source .env.local"
    exit 1
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

# List of tables to backup (based on Prisma schema)
TABLES=(
    "users"
    "alumni_profiles"
    "sports_programs"
    "leadership_messages"
    "featured_testimonials"
    "gallery_events"
    "gallery_images"
    "management_users"
    "events"
    "event_rsvps"
    "calendar_events"
    "event_types"
    "youtube_videos"
    "teachers"
    "latest_updates"
    "testimonials"
    "students"
    "success_stories"
)

# Start backup file with header
echo "-- Supabase Database Backup" > "$BACKUP_FILE"
echo "-- Created: $(date)" >> "$BACKUP_FILE"
echo "-- Tables: ${TABLES[*]}" >> "$BACKUP_FILE"
echo "" >> "$BACKUP_FILE"

# Backup each table
for table in "${TABLES[@]}"; do
    echo -e "${YELLOW}Backing up table: $table${NC}"
    
    # Use psql to dump table data
    psql "$DATABASE_URL" -c "COPY (SELECT * FROM $table) TO STDOUT WITH CSV HEADER" >> "$BACKUP_FILE" 2>&1
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $table backed up${NC}"
    else
        echo -e "${RED}✗ Failed to backup $table (table might not exist)${NC}"
    fi
done

# Get file size
FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo ""
echo -e "${GREEN}✓ Backup completed!${NC}"
echo "  File: $BACKUP_FILE"
echo "  Size: $FILE_SIZE"
echo ""


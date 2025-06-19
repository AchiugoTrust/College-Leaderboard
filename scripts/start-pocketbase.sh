#!/bin/bash

# PocketBase startup script for College Leaderboard
# This script downloads PocketBase if not present and starts it

POCKETBASE_VERSION="0.22.0"
POCKETBASE_DIR="./pocketbase"
POCKETBASE_BINARY="$POCKETBASE_DIR/pocketbase"
DATA_DIR="$POCKETBASE_DIR/pb_data"

# Create PocketBase directory if it doesn't exist
mkdir -p "$POCKETBASE_DIR"

# Function to download PocketBase
download_pocketbase() {
    echo "Downloading PocketBase v$POCKETBASE_VERSION..."
    
    # Detect OS and architecture
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)
    
    case $ARCH in
        x86_64) ARCH="amd64" ;;
        arm64|aarch64) ARCH="arm64" ;;
        armv7l) ARCH="armv7" ;;
        *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
    esac
    
    # Construct download URL
    DOWNLOAD_URL="https://github.com/pocketbase/pocketbase/releases/download/v$POCKETBASE_VERSION/pocketbase_${POCKETBASE_VERSION}_${OS}_${ARCH}.zip"
    
    # Download and extract
    curl -L "$DOWNLOAD_URL" -o "$POCKETBASE_DIR/pocketbase.zip"
    cd "$POCKETBASE_DIR"
    unzip -o pocketbase.zip
    rm pocketbase.zip
    chmod +x pocketbase
    cd ..
    
    echo "PocketBase downloaded successfully!"
}

# Check if PocketBase binary exists
if [ ! -f "$POCKETBASE_BINARY" ]; then
    download_pocketbase
fi

# Create data directory if it doesn't exist
mkdir -p "$DATA_DIR"

echo "Starting PocketBase server..."
echo "Admin UI will be available at: http://localhost:8090/_/"
echo "API will be available at: http://localhost:8090/api/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start PocketBase
cd "$POCKETBASE_DIR"
./pocketbase serve --http=0.0.0.0:8090


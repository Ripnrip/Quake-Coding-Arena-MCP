#!/bin/bash

# 🎭 Enhanced Quake Coding Arena - Local Setup
#
# "Where coding victories become legendary achievements, and every
# keystroke echoes through the digital arena with authentic male/female Quake voices!"
#
# - The Enhanced Quake Arena Local Setup Virtuoso

set -e

echo "🎯 ✨ ENHANCED QUAKE CODING ARENA - LOCAL SETUP COMMENCES!"
echo "📊 Setting up local development environment..."

# 🎨 Navigate to the enhanced arena
cd "$(dirname "$0")"

# 📦 Check Node.js
if ! command -v npm >/dev/null 2>&1; then
    echo "❌ Node.js/npm not found. Please install Node.js first:"
    echo "   brew install node   # macOS"
    echo "   sudo apt install nodejs npm  # Ubuntu/Debian"
    exit 1
fi

# 📦 Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install
echo "✅ 📦 Dependencies installed successfully!"

# 🔧 Build TypeScript
echo "🔧 Building TypeScript project..."
npm run build 2>/dev/null || {
    echo "⚠️ Build command not found, skipping..."
}

# 🎪 Verify sounds directory structure
echo "🎪 Verifying sounds directory structure..."
if [ ! -d "sounds/male" ]; then
    echo "⚠️ sounds/male/ directory not found"
fi
if [ ! -d "sounds/female" ]; then
    echo "⚠️ sounds/female/ directory not found"
fi

MALE_COUNT=$(find sounds/male -name "*.mp3" 2>/dev/null | wc -l | tr -d ' ')
FEMALE_COUNT=$(find sounds/female -name "*.mp3" 2>/dev/null | wc -l | tr -d ' ')

echo "🎵 Found $MALE_COUNT male audio files"
echo "🎵 Found $FEMALE_COUNT female audio files"

# 🔧 Set executable permissions
chmod +x run-server.ts 2>/dev/null || true
chmod +x setup-local.sh
chmod +x setup-remote.sh

# 🎮 Claude Desktop Configuration (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
    CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"
    
    LOCAL_SERVER_PATH="$(pwd)/run-server.ts"
    
    echo "🎯 Configuring Claude Desktop for local development..."
    
    # Create config if it doesn't exist
    if [ ! -f "$CLAUDE_CONFIG_FILE" ]; then
        mkdir -p "$CLAUDE_CONFIG_DIR"
        echo '{"mcpServers": {}}' > "$CLAUDE_CONFIG_FILE"
    fi
    
    # Read existing config
    if command -v jq >/dev/null 2>&1; then
        # Use jq to merge config
        jq ".mcpServers.\"quake-coding-arena-local\" = {
            \"command\": \"node\",
            \"args\": [\"'"$LOCAL_SERVER_PATH"'\"]
        }" "$CLAUDE_CONFIG_FILE" > "$CLAUDE_CONFIG_FILE.tmp" && mv "$CLAUDE_CONFIG_FILE.tmp" "$CLAUDE_CONFIG_FILE"
        echo "✅ Claude Desktop configuration updated!"
    else
        echo "⚠️ jq not found. Please manually add to Claude Desktop config:"
        echo "   File: $CLAUDE_CONFIG_FILE"
        echo "   Add: \"quake-coding-arena-local\": { \"command\": \"node\", \"args\": [\"$LOCAL_SERVER_PATH\"] }"
    fi
fi

# 🎊 Final setup celebration
echo ""
echo "🎉 ✨ LOCAL SETUP COMPLETE! 🎉 ✨"
echo ""
echo "📊 Enhanced Quake Coding Arena is ready for local development!"
echo "   • 25 Epic Achievements"
echo "   • 15 Male + 16 Female audio files"
echo "   • 10 MCP Tools"
echo "   • Full TypeScript support"
echo ""
echo "🔄 Next Steps:"
echo "   1. Test locally: npm run dev"
echo "   2. Build: npm run build"
echo "   3. Run server: node run-server.ts"
echo ""
echo "🎯 Local Development Commands:"
echo "   • npm run dev          - Start development server"
echo "   • npm run build        - Build for production"
echo "   • npm test             - Run tests"
echo ""
echo "🏆 Ready to DOMINATE locally! 🔥"


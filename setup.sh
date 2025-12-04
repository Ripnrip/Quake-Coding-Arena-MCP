#!/bin/bash

# 🎭 The Enhanced Quake Arena Setup Ritual
#
# "Where we summon 30+ legendary Quake sounds and forge the ultimate coding arena!"
# - The Enhanced Quake Arena Setup Virtuoso

set -e

echo "🎯 ✨ ENHANCED QUAKE CODING ARENA SETUP COMMENCES!"
echo "📊 Installing Node.js dependencies for 30+ achievements..."

# 🎨 Navigate to the enhanced arena
cd "$(dirname "$0")"

# 📦 Install Node.js dependencies
if command -v npm >/dev/null 2>&1; then
    npm install
    echo "✅ 📦 Enhanced Node.js dependencies installed successfully!"
else
    echo "❌ Node.js/npm not found. Please install Node.js first:"
    echo "   brew install node   # macOS"
    echo "   sudo apt install nodejs npm  # Ubuntu/Debian"
    exit 1
fi

# 🎪 Create enhanced sounds directory if it doesn't exist
mkdir -p sounds
echo "✅ 🎪 Enhanced sounds directory created/verified!"

# 🔊 Copy existing sounds to enhanced location
if [ -d "../sounds" ]; then
    cp -v ../sounds/*.mp3 sounds/ 2>/dev/null || echo "🌙 No existing sounds to copy, that's okay!"
    echo "✅ 🔊 Existing sounds copied to enhanced arena!"
fi

# 🎯 Check for enhanced sound files
echo "📊 Checking enhanced sound files..."
SOUND_COUNT=$(find sounds -name "*.mp3" 2>/dev/null | wc -l)
echo "🎵 Found $SOUND_COUNT enhanced sound files"

if [ "$SOUND_COUNT" -lt 7 ]; then
    echo "🌙 ⚠️ Only $SOUND_COUNT sound files found. The enhanced arena supports 30+ achievements!"
    echo "📚 See SETUP.md for downloading the complete enhanced sound collection"
fi

# 🔧 Set up enhanced executable permissions
chmod +x index.js
echo "✅ 🔧 Enhanced executable permissions set!"

# 🎮 Update Claude Desktop configuration for enhanced version
CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"

ENHANCED_SERVER_PATH="$(pwd)/index.js"

echo "🎯 Updating Claude Desktop configuration for enhanced Node.js server..."

# Create enhanced configuration
ENHANCED_CONFIG='{
  "mcpServers": {
    "quake-coding-arena": {
      "command": "node",
      "args": ["'"$ENHANCED_SERVER_PATH"'"]
    }
  }
}'

# Create Claude config directory if needed
mkdir -p "$CLAUDE_CONFIG_DIR"

# Write enhanced configuration
echo "$ENHANCED_CONFIG" > "$CLAUDE_CONFIG_FILE"

echo "✅ 🎯 Enhanced Claude Desktop configuration updated!"
echo "📍 Config file: $CLAUDE_CONFIG_FILE"

# 🎊 Final enhanced setup celebration
echo ""
echo "🎉 ✨ ENHANCED SETUP COMPLETE! 🎉 ✨"
echo "📊 Enhanced Quake Coding Arena is ready with 30+ achievements!"
echo ""
echo "🔄 Next Steps:"
echo "   1. Restart Claude Desktop to load the enhanced server"
echo "   2. Try enhanced commands like:"
echo "      • 'Play godlike achievement sound'"
echo "      • 'Trigger wicked sick achievement at 70% volume'"
echo "      • 'Show me all streak achievements'"
echo "      • 'Random team achievement'"
echo "      • 'What are my enhanced statistics?'"
echo ""
echo "🏆 Enhanced Categories Available:"
echo "   🔥 Streaks (kill-spree → godlike)"
echo "   ✨ Quality (excellent, perfect, impressive)"
echo "   ⚔️ Multi-kills (double-kill → holy-shit)"
echo "   🎮 Game Events (first-blood, headshot, humiliation)"
echo "   👥 Team Achievements (team-kill, taken-the-lead)"
echo "   💎 Power-ups (quad-damage, armor, health)"
echo ""
echo "🎯 Ready to DOMINATE with 30+ enhanced achievements! 🔥"
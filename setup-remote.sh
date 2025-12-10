#!/bin/bash

# 🎭 Enhanced Quake Coding Arena - Remote (Smithery) Setup
#
# "Where coding victories become legendary achievements, deployed to the cloud!"
#
# - The Enhanced Quake Arena Remote Setup Virtuoso

set -e

echo "🌐 ✨ ENHANCED QUAKE CODING ARENA - REMOTE SETUP COMMENCES!"
echo "📊 Setting up for Smithery cloud deployment..."

# 🎨 Navigate to the enhanced arena
cd "$(dirname "$0")"

# 📦 Check Node.js
if ! command -v npm >/dev/null 2>&1; then
    echo "❌ Node.js/npm not found. Please install Node.js first:"
    echo "   brew install node   # macOS"
    echo "   sudo apt install nodejs npm  # Ubuntu/Debian"
    exit 1
fi

# 📦 Check Smithery CLI
if ! command -v npx >/dev/null 2>&1; then
    echo "❌ npx not found. Please install Node.js with npm."
    exit 1
fi

# 📦 Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ 📦 Dependencies installed successfully!"

# 🔧 Build for Smithery
echo "🔧 Building for Smithery deployment..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check errors above."
    exit 1
fi

# 🎪 Verify sounds are included
echo "🎪 Verifying sounds directory..."
if [ ! -d "sounds" ]; then
    echo "⚠️ Warning: sounds/ directory not found"
else
    MALE_COUNT=$(find sounds/male -name "*.mp3" 2>/dev/null | wc -l | tr -d ' ')
    FEMALE_COUNT=$(find sounds/female -name "*.mp3" 2>/dev/null | wc -l | tr -d ' ')
    echo "✅ Found $MALE_COUNT male + $FEMALE_COUNT female audio files"
fi

# 📋 Verify package.json configuration
echo "📋 Verifying Smithery configuration..."
if grep -q '"smithery"' package.json; then
    echo "✅ Smithery configuration found in package.json"
else
    echo "⚠️ Warning: Smithery configuration not found in package.json"
fi

# 🔧 Verify smithery.yaml
if [ -f "smithery.yaml" ]; then
    echo "✅ smithery.yaml found"
else
    echo "⚠️ Warning: smithery.yaml not found"
fi

# 🎮 Claude Desktop Configuration for Remote (Smithery)
if [[ "$OSTYPE" == "darwin"* ]]; then
    CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
    CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"
    
    echo "🎯 Configuring Claude Desktop for Smithery deployment..."
    
    # Create config if it doesn't exist
    if [ ! -f "$CLAUDE_CONFIG_FILE" ]; then
        mkdir -p "$CLAUDE_CONFIG_DIR"
        echo '{"mcpServers": {}}' > "$CLAUDE_CONFIG_FILE"
    fi
    
    LOCAL_BUILD_PATH="$(pwd)/.smithery/index.cjs"
    SMITHERY_URL="https://server.smithery.ai/@Ripnrip/quake-coding-arena-mcp/mcp"
    
    echo "🔍 Package is published on Smithery!"
    echo "   🔗 View at: https://smithery.ai/server/@Ripnrip/quake-coding-arena-mcp"
    echo ""
    echo "📋 Connection Options:"
    echo "   1. HTTP Endpoint (Recommended for Smithery):"
    echo "      URL: $SMITHERY_URL"
    echo "   2. Local Build (For testing):"
    echo "      Path: $LOCAL_BUILD_PATH"
    echo ""
    
    # For now, use local build since HTTP endpoints need special MCP client support
    if [ -f "$LOCAL_BUILD_PATH" ]; then
        echo "📦 Configuring for local build (Smithery HTTP endpoints require client support)"
        
        if command -v jq >/dev/null 2>&1; then
            # Use local build path
            jq ".mcpServers.\"quake-coding-arena-remote\" = {
                \"command\": \"node\",
                \"args\": [\"$LOCAL_BUILD_PATH\"]
            }" "$CLAUDE_CONFIG_FILE" > "$CLAUDE_CONFIG_FILE.tmp" && mv "$CLAUDE_CONFIG_FILE.tmp" "$CLAUDE_CONFIG_FILE"
            echo "✅ Claude Desktop configured to use local build!"
            echo ""
            echo "💡 To use Smithery HTTP endpoint:"
            echo "   • Some MCP clients support HTTP transport"
            echo "   • Use URL: $SMITHERY_URL"
            echo "   • Check your MCP client documentation for HTTP endpoint support"
        else
            echo "⚠️ jq not found. Please manually add to Claude Desktop config:"
            echo "   File: $CLAUDE_CONFIG_FILE"
            echo "   Add: \"quake-coding-arena-remote\": { \"command\": \"node\", \"args\": [\"$LOCAL_BUILD_PATH\"] }"
        fi
    else
        echo "⚠️ Local build not found. Run 'npm run build' first."
        echo "   Or use Smithery HTTP endpoint: $SMITHERY_URL"
    fi
fi

# 🎊 Final setup celebration
echo ""
echo "🌐 ✨ REMOTE SETUP COMPLETE! 🎉 ✨"
echo ""
echo "📊 Enhanced Quake Coding Arena is ready for Smithery deployment!"
echo "   • 25 Epic Achievements"
echo "   • 15 Male + 16 Female audio files"
echo "   • 10 MCP Tools"
echo "   • HTTP Streamable Transport"
echo "   • Cloud-ready deployment"
echo ""
echo "🔄 Next Steps:"
echo "   1. Package Status:"
echo "      📦 Package is published on Smithery!"
echo "      🔗 View at: https://smithery.ai/server/@Ripnrip/quake-coding-arena-mcp"
echo "      ⚠️  Note: Smithery packages use HTTP endpoints, not npx"
echo "      • For Claude Desktop, use the connection URL from Smithery"
echo "      • Or configure via Smithery's MCP connection method"
echo "      • See: https://smithery.ai/server/@Ripnrip/quake-coding-arena-mcp"
echo "   2. Test locally: npm run smithery:dev"
echo "   3. Build: npm run smithery:build"
echo ""
echo "🌐 Smithery Deployment Commands:"
echo "   • npm run smithery:dev    - Test Smithery deployment locally"
echo "   • npm run smithery:build  - Build for Smithery"
echo "   • npm run smithery:test   - Test MCP server"
echo ""
echo "📚 Documentation:"
echo "   • See SMITHERY-DEPLOYMENT.md for detailed deployment guide"
echo "   • See PUBLISH.md for publishing instructions"
echo ""
echo "🏆 Ready to DOMINATE in the cloud! 🔥"


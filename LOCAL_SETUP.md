# Quake Coding Arena - Local Setup Guide

## Quick Start (5 minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/Ripnrip/Quake-Coding-Arena-MCP.git
cd Quake-Coding-Arena-MCP
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build the Project
```bash
npm run build
```

### 4. Run the MCP Server
```bash
node .smithery/index.cjs
```

You should see:
```
🎮 Quake Coding Arena MCP Server running on port 3000
📍 MCP endpoint: http://localhost:3000/mcp
```

### 5. Connect to Claude Desktop

Add to your Claude Desktop configuration:

**macOS/Linux**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "quake-coding-arena": {
      "url": "http://localhost:3000/mcp",
      "name": "Quake Coding Arena",
      "description": "Gamified coding with Quake 3 Arena voice packs"
    }
  }
}
```

### 6. Restart Claude Desktop

Close and reopen Claude Desktop. The Quake Coding Arena tools will be available!

## Available Tools

- 🏆 **play_enhanced_quake_sound** - Play achievement sounds with male/female voices
- 🎲 **random_enhanced_achievement** - Play random achievement sounds
- 📋 **list_enhanced_achievements** - List all available achievements
- 🔊 **set_enhanced_volume** - Adjust global volume
- 🎤 **set_voice_pack** - Switch between male/female announcer
- 📊 **get_enhanced_achievement_stats** - View your coding session stats
- ℹ️ **get_voice_pack_info** - Get current voice pack info

## Troubleshooting

### Sounds not playing?
- **macOS**: Ensure `afplay` is available (should be pre-installed)
- **Windows**: PowerShell audio commands should work automatically
- **Linux**: Install `mpv` or `paplay` for audio playback

### Port already in use?
Change the port in step 4:
```bash
PORT=3001 node .smithery/index.cjs
```

Then update the URL in step 5 to match.

## Features

✅ 15 unique Quake 3 Arena achievements
✅ Male & Female voice packs
✅ Session statistics tracking
✅ Volume control
✅ Random achievement selection
✅ Category filtering

## Getting Started

Once connected, try saying:
- "Play an impressive achievement"
- "Give me a random achievement"
- "Show my stats"
- "Set volume to 90%"
- "Switch to female voice"

Happy coding! May your victories be legendary! 🎮

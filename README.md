# 🎯 Enhanced Quake Coding Arena - MCP Server

![Quake Coding Arena Logo](logo.png)

**DOMINATING! EXCELLENT! GODLIKE! UNSTOPPABLE!** 🎯🔥

> **Premium TypeScript MCP Server for gamifying your development environment with authentic Quake 3 Arena sounds and dual voice announcers**

## 🚀 **Features**

### 🎮 **11 Epic Achievements**
- **Streak Achievements**: RAMPAGE, DOMINATING, UNSTOPPABLE, GODLIKE
- **Quality Achievements**: EXCELLENT, PERFECT, IMPRESSIVE
- **Multi-Kills**: WICKED SICK
- **Game Events**: FIRST BLOOD, HUMILIATION
- **Team Events**: PREPARE TO FIGHT

### 🎤 **Dual Voice System**
- **Male Announcer**: Classic Quake 3 Arena voice
- **Female Announcer**: Energetic "Sexy Female Announcer" voice
- **Instant switching** between voice packs
- **Volume control** (0-100%)

### 🔧 **MCP Integration**
- **10 MCP Tools** for complete control
- **JSON-RPC 2.0** compliant
- **Session statistics** tracking
- **Category filtering** for achievements
- **Random achievement** selection
- **AI usage guide** integration

## 📦 **Installation via Smithery**

```bash
# Install from Smithery registry
smithery install quake-coding-arena-enhanced

# Or add to your MCP configuration
{
  "mcpServers": {
    "quake-arena": {
      "command": "smithery",
      "args": ["run", "quake-coding-arena-enhanced"]
    }
  }
}
```

## 🎯 **Available MCP Tools**

### Core Achievement Tools
- `play_enhanced_quake_sound` - Trigger specific achievements
- `random_enhanced_achievement` - Random by category
- `list_enhanced_achievements` - Browse all achievements

### Control & Settings
- `set_enhanced_volume` - Set volume (0-100)
- `set_voice_pack` - Switch male/female voices
- `get_voice_pack_info` - Voice information

### Statistics & Guides
- `get_enhanced_achievement_stats` - Session statistics
- `get_enhanced_achievement_guide` - Achievement guide
- `get_ai_usage_guide` - Context-specific usage tips
- `test_voice_packs` - Test all voice packs

## 🎮 **Usage Examples**

```javascript
// Trigger a GODLIKE achievement at 80% volume
await session.call("tools/call", {
  name: "play_enhanced_quake_sound",
  arguments: {
    achievement: "GODLIKE",
    volume: 80,
    voiceGender: "female"
  }
});

// Get a random quality achievement
await session.call("tools/call", {
  name: "random_enhanced_achievement",
  arguments: {
    category: "quality",
    volume: 70
  }
});

// Switch to female voice pack
await session.call("tools/call", {
  name: "set_voice_pack",
  arguments: {
    voiceGender: "female"
  }
});
```

## 🔧 **Configuration**

The server automatically detects sound files and supports:
- **MP3 and WAV** audio formats
- **Custom sound directories**
- **Voice pack management**
- **Session persistence**

## 📁 **Project Structure**

```
quake-coding-arena-enhanced/
├── index.js              # Main MCP server
├── package.json           # NPM configuration
├── smithery.yaml         # Smithery configuration
├── sounds/               # Audio files
│   ├── male/            # Male announcer sounds
│   └── female/          # Female announcer sounds
├── README.md            # This file
└── test-mcp-server.js   # Test utilities
```

## 🏆 **Achievement Categories**

### 🔥 **Streak Achievements**
- **RAMPAGE** (10) - Multiple quick tasks
- **DOMINATING** (15) - Complex problems solved
- **UNSTOPPABLE** (20) - Long productive sessions
- **GODLIKE** (25) - Legendary coding sessions

### ✨ **Quality Achievements**
- **EXCELLENT** - Elegant solutions
- **PERFECT** - Flawless implementation
- **IMPRESSIVE** - Creative problem-solving

### ⚔️ **Special Achievements**
- **WICKED SICK** - Mind-blowing solutions
- **FIRST BLOOD** - First bug found
- **HUMILIATION** - Quick bug fixes
- **PREPARE TO FIGHT** - Team motivation

## 🎯 **Perfect For**

- **Developers** wanting gamified coding environments
- **Teams** needing motivational feedback
- **Streamers** wanting engaging content
- **Educators** teaching coding concepts
- **Anyone** loving Quake 3 Arena nostalgia!

## 📊 **Requirements**

- **Node.js 18+** for MCP server
- **MCP-compatible** IDE (Cursor, Claude Desktop, etc.)
- **Audio system** for sound playback

## 🔗 **Integration Examples**

### Claude Desktop
```json
{
  "mcpServers": {
    "quake-arena": {
      "command": "npx",
      "args": ["@smithery/quake-coding-arena-enhanced"]
    }
  }
}
```

### Cursor
Add to MCP settings or use Smithery integration.

## 📜 **License**

MIT License - Feel free to use and modify!

## 🎯 **Get Started**

1. **Install**: `smithery install quake-coding-arena-enhanced`
2. **Configure**: Add to your MCP client
3. **Achieve**: Start triggering those epic sounds!

**🏆 READY TO DOMINATE THE CODING ARENA! 🎯🔥**

---

*Built with ❤️ and Quake 3 Arena nostalgia*
*Published via Smithery - The MCP Server Registry*

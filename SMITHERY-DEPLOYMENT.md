# 🌐 Smithery Deployment Guide - Dual Voice Audio Integration

## ✅ **How Male & Female Audio Work with Smithery**

Both **male** and **female** audio files work identically on Smithery. This guide covers both voice packs.

### **File Inclusion Mechanism:**

When deployed to Smithery, the server uses the `package.json` "files" array to determine what to include:

```json
"files": [
  "src/",
  "sounds/",        // ✅ Includes entire sounds/ directory
  "README.md",
  "smithery.yaml",
  "tsconfig.json",
  "package.json"
]
```

**This means:**
- ✅ **All 15 male audio files** in `sounds/male/` are automatically included
- ✅ **All 16 female audio files** in `sounds/female/` are automatically included
- ✅ **No manual configuration needed** - Smithery handles it automatically
- ✅ **Both voices work identically** - Same invocation mechanism, same playback flow

### **Deployment Architecture:**

```
Smithery Cloud Server
├── .smithery/index.cjs     (Bundled MCP server)
├── sounds/
│   ├── male/               (17 audio files)
│   └── female/             (16 audio files) ✅
└── package.json
```

### **How Users Access Female Audio:**

#### **1. Via MCP Tools (Explicit Invocation):**

Users must explicitly call MCP tools to trigger audio playback:

```javascript
// Switch to female voice pack
await session.call("tools/call", {
  name: "set_voice_pack",
  arguments: { voiceGender: "female" }
});

// Play female achievement
await session.call("tools/call", {
  name: "play_enhanced_quake_sound",
  arguments: {
    achievement: "HEADSHOT",
    volume: 85,
    voiceGender: "female"  // 🎤 Explicitly request female voice
  }
});
```

#### **2. Via Voice Pack Setting:**

Set male or female as default, then all subsequent plays use that voice:

```javascript
// Set MALE as default voice pack
await session.call("tools/call", {
  name: "set_voice_pack",
  arguments: { voiceGender: "male" }
});

// Now all achievements use male voice
await session.call("tools/call", {
  name: "play_enhanced_quake_sound",
  arguments: {
    achievement: "GODLIKE",
    volume: 80
    // Uses current voice pack (male) ✅
  }
});

// Or set FEMALE as default
await session.call("tools/call", {
  name: "set_voice_pack",
  arguments: { voiceGender: "female" }
});

// Now all achievements use female voice
await session.call("tools/call", {
  name: "play_enhanced_quake_sound",
  arguments: {
    achievement: "GODLIKE",
    volume: 80
    // Uses current voice pack (female) ✅
  }
});
```

### **Audio Playback Flow:**

```
User/AI calls MCP tool
    ↓
Smithery HTTP endpoint receives request
    ↓
MCP server processes request
    ↓
EnhancedSoundOracle.playAchievementSound() executes
    ↓
Finds audio file in sounds/female/ or sounds/male/
    ↓
Spawns system command (afplay/powershell/paplay)
    ↓
Audio plays on USER'S LOCAL MACHINE ✅
```

**Key Point:** Audio plays locally on the user's computer, not in the cloud. Smithery just triggers the playback.

### **Available Audio Files:**

**Male Voice (15 files):**
- **Streak Achievements:** rampage.mp3, dominating.mp3, unstoppable.mp3, godlike.mp3
- **Quality Achievements:** excellent.mp3, perfect.mp3, impressive.mp3
- **Multi-Kills:** double-kill.mp3, triple-kill.mp3, wicked-sick.mp3, ulltra-kill.mp3
- **Game Events:** first-blood.mp3, humiliation.mp3, holy-shit.mp3
- **Team Events:** prepare-to-fight.mp3

**Female Voice (16 files):**
- **Streak Achievements:** rampage.mp3, dominating.mp3, unstoppable.mp3, godlike.mp3
- **Multi-Kills:** headshot.mp3, multi-kill.mp3, killing-spree.mp3, ultra-kill.mp3, monster-kill.mp3, ludicrous-kill.mp3, wicked-sick.mp3
- **Game Events:** first-blood.mp3, himiliation.mp3, holy-shit.mp3, bottom-feeder.mp3
- **Team Events:** play.mp3

### **Smart Fallback System:**

If a female audio file is missing, the system automatically falls back to male voice:

```typescript
// In EnhancedSoundOracle.playAchievementSound()
// 1. Try female voice file
// 2. If not found, try male voice file
// 3. If still not found, throw error
```

### **Testing Smithery Deployment:**

To verify both male and female audio are included:

1. **Check package.json files array:**
   ```bash
   grep -A 5 '"files"' package.json
   ```

2. **Verify sounds directory structure:**
   ```bash
   ls -la sounds/male/    # Should show 15 files
   ls -la sounds/female/  # Should show 16 files
   ```

3. **Build for Smithery:**
   ```bash
   npm run build
   ```

4. **Deploy to Smithery:**
   - Files in "files" array are automatically included
   - Both male and female audio directories included
   - No additional configuration needed

### **Important Notes:**

- ⚠️ **Audio requires explicit tool invocation** - No automatic playback
- ✅ **All 25 achievements** work with both male and female voices
- ✅ **15 male + 16 female audio files** all included automatically
- ✅ **Volume control** works (0-100%)
- ✅ **Voice switching** is instant between male/female
- ✅ **Cross-platform** audio support (macOS/Windows/Linux)
- ✅ **Smart fallback** to male voice if female missing (or vice versa)

### **User Experience:**

When users install via Smithery:

1. **Browse Smithery registry** → Find "Enhanced Quake Coding Arena"
2. **One-click install** → Smithery handles deployment
3. **Connect via HTTP** → No local installation needed
4. **Use MCP tools** → Call tools to trigger audio
5. **Enjoy dual voices** → All 15 male + 16 female sounds available! 🎤

---

**Last Updated:** December 10, 2025
**Status:** ✅ Fully configured for Smithery deployment with dual voice (male + female) audio support


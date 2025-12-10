# 🤖 Agent Guide - Enhanced Quake Coding Arena MCP Server

**For AI Agents and Assistants**

This guide helps AI agents understand how to use the Enhanced Quake Coding Arena MCP server to gamify coding sessions and celebrate achievements.

---

## 📋 **Quick Reference**

### **Server Information**
- **Name:** Enhanced Quake Coding Arena
- **Version:** 2.2.0
- **Capabilities:** Tools, Resources, Prompts
- **Total Tools:** 10 MCP tools
- **Achievements:** 25 epic achievements
- **Voice Packs:** Male (15 sounds) + Female (16 sounds)

### **Installation**
```json
{
  "mcpServers": {
    "quake-arena": {
      "command": "npx",
      "args": ["@Ripnrip/quake-coding-arena-mcp"]
    }
  }
}
```

---

## 🎯 **Available Tools**

### **1. Achievement Playback Tools**

#### `play_enhanced_quake_sound`
**Purpose:** Play a specific achievement sound to celebrate coding victories.

**Parameters:**
- `achievement` (required): Achievement name (e.g., "GODLIKE", "FIRST BLOOD", "HEADSHOT")
- `volume` (optional, default: 80): Volume level 0-100
- `voiceGender` (optional): "male" or "female" to override default voice pack

**Example Usage:**
```javascript
// Celebrate a major milestone
await callTool("play_enhanced_quake_sound", {
  achievement: "GODLIKE",
  volume: 85,
  voiceGender: "female"
});

// Quick bug fix celebration
await callTool("play_enhanced_quake_sound", {
  achievement: "HEADSHOT",
  volume: 70
});
```

**When to Use:**
- ✅ After completing a major feature
- ✅ When fixing a critical bug
- ✅ After passing all tests
- ✅ When deploying successfully
- ✅ After solving a complex problem

#### `random_enhanced_achievement`
**Purpose:** Play a random achievement for surprise celebrations.

**Parameters:**
- `category` (optional): Filter by "streak", "quality", "multi", "game", or "team"
- `volume` (optional, default: 80): Volume level 0-100

**Example Usage:**
```javascript
// Random celebration
await callTool("random_enhanced_achievement", {
  volume: 75
});

// Random quality achievement
await callTool("random_enhanced_achievement", {
  category: "quality",
  volume: 80
});
```

**When to Use:**
- ✅ For variety in celebrations
- ✅ When unsure which achievement fits
- ✅ To add surprise element
- ✅ During long coding sessions

#### `list_enhanced_achievements`
**Purpose:** Discover available achievements and their categories.

**Parameters:**
- `category` (optional): Filter by category

**Example Usage:**
```javascript
// List all achievements
await callTool("list_enhanced_achievements", {});

// List only streak achievements
await callTool("list_enhanced_achievements", {
  category: "streak"
});
```

**When to Use:**
- ✅ To discover available achievements
- ✅ When planning celebration strategy
- ✅ To understand achievement categories
- ✅ Before suggesting achievements to users

---

### **2. Voice & Volume Control Tools**

#### `set_voice_pack`
**Purpose:** Switch between male and female voice packs.

**Parameters:**
- `voiceGender` (required): "male" or "female"

**Example Usage:**
```javascript
// Switch to female voice
await callTool("set_voice_pack", {
  voiceGender: "female"
});

// Switch back to male voice
await callTool("set_voice_pack", {
  voiceGender: "male"
});
```

**When to Use:**
- ✅ User requests specific voice
- ✅ To add variety to celebrations
- ✅ When user shows preference
- ✅ For different achievement types

#### `get_voice_pack_info`
**Purpose:** Get information about current and available voice packs.

**Parameters:** None

**Example Usage:**
```javascript
await callTool("get_voice_pack_info", {});
```

**When to Use:**
- ✅ To check current voice setting
- ✅ To inform user of available voices
- ✅ Before switching voices

#### `set_enhanced_volume`
**Purpose:** Adjust global volume for all achievement sounds.

**Parameters:**
- `volume` (required): Volume level 0-100

**Example Usage:**
```javascript
// Set to 50% volume
await callTool("set_enhanced_volume", {
  volume: 50
});

// Maximum volume
await callTool("set_enhanced_volume", {
  volume: 100
});
```

**When to Use:**
- ✅ User requests volume change
- ✅ Adjusting for environment (lower in shared spaces)
- ✅ User preferences

---

### **3. Statistics & Information Tools**

#### `get_enhanced_achievement_stats`
**Purpose:** Retrieve session statistics and achievement progress.

**Parameters:** None

**Example Usage:**
```javascript
await callTool("get_enhanced_achievement_stats", {});
```

**Returns:**
- Total achievements played
- Category breakdown
- Session duration
- Current voice pack
- Volume setting
- Favorite category
- Streak information

**When to Use:**
- ✅ User asks about progress
- ✅ End of session summary
- ✅ To show productivity metrics
- ✅ Celebrating milestones

#### `get_enhanced_achievement_guide`
**Purpose:** Get comprehensive guide about achievements.

**Parameters:**
- `category` (optional): Filter by category

**Example Usage:**
```javascript
// Full guide
await callTool("get_enhanced_achievement_guide", {});

// Guide for specific category
await callTool("get_enhanced_achievement_guide", {
  category: "streak"
});
```

**When to Use:**
- ✅ User asks about achievements
- ✅ Explaining achievement system
- ✅ Helping user choose achievements
- ✅ Educational purposes

#### `get_ai_usage_guide`
**Purpose:** Get context-specific usage tips for AI assistants.

**Parameters:**
- `context` (optional): "coding", "testing", "debugging", "deployment", or "general"

**Example Usage:**
```javascript
// Get coding context guide
await callTool("get_ai_usage_guide", {
  context: "coding"
});

// General guide
await callTool("get_ai_usage_guide", {});
```

**When to Use:**
- ✅ Learning best practices
- ✅ Understanding usage patterns
- ✅ Context-specific recommendations
- ✅ Improving celebration timing

#### `test_voice_packs`
**Purpose:** Test all voice packs by playing sample achievements.

**Parameters:**
- `volume` (optional, default: 80): Volume for test

**Example Usage:**
```javascript
await callTool("test_voice_packs", {
  volume: 70
});
```

**When to Use:**
- ✅ Verifying audio setup
- ✅ Testing voice packs
- ✅ Troubleshooting audio issues
- ✅ User requests test

---

## 🎮 **Achievement Categories & Usage**

### **🔥 Streak Achievements**
For consecutive accomplishments or sustained excellence:
- **RAMPAGE** (10) - Multiple quick tasks completed
- **DOMINATING** (15) - Complex problems solved
- **UNSTOPPABLE** (20) - Long productive sessions
- **GODLIKE** (25) - Legendary coding sessions

**Usage Pattern:**
```javascript
// Track user's consecutive successes
let streak = 0;
// After each success:
streak++;
if (streak >= 25) {
  await callTool("play_enhanced_quake_sound", { achievement: "GODLIKE" });
} else if (streak >= 20) {
  await callTool("play_enhanced_quake_sound", { achievement: "UNSTOPPABLE" });
} // ... etc
```

### **✨ Quality Achievements** (Male Voice Only)
For exceptional code quality:
- **EXCELLENT** - Elegant solutions
- **PERFECT** - Flawless implementation
- **IMPRESSIVE** - Creative problem-solving

**Usage Pattern:**
```javascript
// After code review or linting passes
await callTool("play_enhanced_quake_sound", {
  achievement: "EXCELLENT",
  voiceGender: "male" // Required for quality achievements
});
```

### **⚔️ Multi-Kill Achievements**
For rapid success or multiple accomplishments:
- **HEADSHOT** (Female) - Precision coding
- **MULTI KILL** (Female) - Multiple bugs squashed
- **KILLING SPREE** (Female) - Consistent productivity
- **ULTRA KILL** (Female) - Exceptional performance
- **MONSTER KILL** (Female) - Massive refactoring
- **LUDICROUS KILL** (Female) - Unbelievable solutions
- **WICKED SICK** (Both) - Mind-blowing solutions
- **DOUBLE KILL** (Male) - Two quick wins
- **TRIPLE KILL** (Male) - Triple efficiency

**Usage Pattern:**
```javascript
// After fixing multiple bugs quickly
await callTool("play_enhanced_quake_sound", {
  achievement: "MULTI KILL",
  voiceGender: "female"
});
```

### **🎪 Game State Announcements**
For important milestones:
- **FIRST BLOOD** (Both) - First bug found, first test passed
- **HUMILIATION** (Male) - Quick bug fixes
- **HOLY SHIT** (Both) - Unexpected breakthroughs
- **BOTTOM FEEDER** (Female) - Learning from mistakes

**Usage Pattern:**
```javascript
// First success of the session
await callTool("play_enhanced_quake_sound", {
  achievement: "FIRST BLOOD"
});
```

### **👥 Team Events**
For collaboration and motivation:
- **PREPARE TO FIGHT** (Male) - Before deployment or major work
- **PLAY** (Female) - Game on, let's code!

**Usage Pattern:**
```javascript
// Before starting a major task
await callTool("play_enhanced_quake_sound", {
  achievement: "PREPARE TO FIGHT",
  voiceGender: "male"
});
```

---

## 🎯 **Usage Scenarios**

### **Scenario 1: Feature Completion**
```javascript
// User completes a major feature
await callTool("play_enhanced_quake_sound", {
  achievement: "GODLIKE",
  volume: 85,
  voiceGender: "female"
});

// Then show stats
const stats = await callTool("get_enhanced_achievement_stats", {});
// Display: "You've achieved GODLIKE! Total achievements: X"
```

### **Scenario 2: Bug Fixing Session**
```javascript
// First bug found
await callTool("play_enhanced_quake_sound", {
  achievement: "FIRST BLOOD",
  volume: 75
});

// Quick fix
await callTool("play_enhanced_quake_sound", {
  achievement: "HEADSHOT",
  voiceGender: "female",
  volume: 80
});

// Multiple bugs fixed
await callTool("play_enhanced_quake_sound", {
  achievement: "MULTI KILL",
  voiceGender: "female"
});
```

### **Scenario 3: Test Suite Success**
```javascript
// All tests passing
await callTool("play_enhanced_quake_sound", {
  achievement: "PERFECT",
  voiceGender: "male",
  volume: 80
});

// 100% coverage achieved
await callTool("play_enhanced_quake_sound", {
  achievement: "WICKED SICK",
  volume: 90
});
```

### **Scenario 4: Code Review Excellence**
```javascript
// Code passes review with flying colors
await callTool("play_enhanced_quake_sound", {
  achievement: "EXCELLENT",
  voiceGender: "male"
});

// Creative solution praised
await callTool("play_enhanced_quake_sound", {
  achievement: "IMPRESSIVE",
  voiceGender: "male"
});
```

### **Scenario 5: Deployment Success**
```javascript
// Before deployment
await callTool("play_enhanced_quake_sound", {
  achievement: "PREPARE TO FIGHT",
  voiceGender: "male",
  volume: 85
});

// Successful deployment
await callTool("play_enhanced_quake_sound", {
  achievement: "RAMPAGE",
  volume: 90
});
```

### **Scenario 6: Long Productive Session**
```javascript
// Track session progress
let tasksCompleted = 0;

// After each task:
tasksCompleted++;
if (tasksCompleted === 10) {
  await callTool("play_enhanced_quake_sound", { achievement: "RAMPAGE" });
} else if (tasksCompleted === 15) {
  await callTool("play_enhanced_quake_sound", { achievement: "DOMINATING" });
} else if (tasksCompleted === 20) {
  await callTool("play_enhanced_quake_sound", { achievement: "UNSTOPPABLE" });
} else if (tasksCompleted === 25) {
  await callTool("play_enhanced_quake_sound", { achievement: "GODLIKE" });
}
```

---

## 💡 **Best Practices for Agents**

### **1. Context-Aware Celebrations**
- Match achievement to accomplishment type
- Use appropriate voice pack for achievement
- Adjust volume based on context (lower in shared spaces)

### **2. Don't Overuse**
- Not every action needs an achievement
- Save major achievements for significant milestones
- Use random achievements for variety

### **3. User Preferences**
- Check stats to understand user patterns
- Respect volume preferences
- Remember voice pack choice

### **4. Error Handling**
- Always handle tool call errors gracefully
- Provide fallback messages if audio fails
- Inform user if achievement unavailable

### **5. Informative Responses**
- Explain why you chose a specific achievement
- Share stats after major milestones
- Suggest achievements when appropriate

### **6. Progressive Celebrations**
- Start with smaller achievements
- Build up to major ones
- Track streaks for appropriate celebrations

---

## 🔍 **Navigation & Discovery**

### **Discovering Available Tools**
```javascript
// List all tools (if MCP client supports)
// Or check tool schemas to understand parameters
```

### **Understanding Achievements**
```javascript
// Get full guide
const guide = await callTool("get_enhanced_achievement_guide", {});

// Get category-specific guide
const streakGuide = await callTool("get_enhanced_achievement_guide", {
  category: "streak"
});
```

### **Checking Current State**
```javascript
// Get current voice pack
const voiceInfo = await callTool("get_voice_pack_info", {});

// Get session stats
const stats = await callTool("get_enhanced_achievement_stats", {});
```

---

## 🎨 **Example Agent Workflow**

```javascript
// 1. User completes a task
// 2. Agent evaluates accomplishment
if (task.isMajorFeature) {
  await callTool("play_enhanced_quake_sound", {
    achievement: "GODLIKE",
    volume: 85
  });
  const stats = await callTool("get_enhanced_achievement_stats", {});
  return `🎉 GODLIKE achievement unlocked! You've completed ${stats.stats.totalAchievements} achievements this session.`;
} else if (task.isQuickFix) {
  await callTool("play_enhanced_quake_sound", {
    achievement: "HEADSHOT",
    voiceGender: "female"
  });
  return "🎯 HEADSHOT! Quick and precise fix!";
} else {
  // Random celebration for variety
  await callTool("random_enhanced_achievement", {
    volume: 75
  });
  return "🎲 Random celebration for your accomplishment!";
}
```

---

## 📚 **Resources**

### **Sound Files**
Accessible via `quake://` URIs:
- `quake://sounds/male/[filename].mp3`
- `quake://sounds/female/[filename].mp3`

### **Prompts**
- `encourage-developer` - Motivational prompts
- `celebrate-victory` - Celebration prompts

---

## 🚀 **Quick Start for Agents**

1. **Check available tools** - Understand what's available
2. **Learn achievements** - Use `get_enhanced_achievement_guide`
3. **Set preferences** - Configure voice and volume
4. **Start celebrating** - Use achievements appropriately
5. **Track progress** - Monitor stats for insights

---

**Last Updated:** December 10, 2025  
**Version:** 2.2.0  
**For:** AI Agents and Assistants


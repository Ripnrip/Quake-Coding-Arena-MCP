# 🎯 Claude Code - MCP Setup Guide

**Connect Enhanced Quake Coding Arena to Claude Code IDE**

---

## 🚀 **Quick Setup (HTTP Endpoint)**

### **Step 1: Start the Server**

Make sure your server is running on port 6487:

```bash
cd /Users/gurindersingh/Documents/Developer/Quake-Coding-Arena-MCP
npm run dev
```

You should see:
```
🎮 ✨ Quake Coding Arena MCP Server starting!
📍 Running on port 6487
🌐 MCP endpoint: http://localhost:6487/mcp
```

### **Step 2: Add MCP Server to Claude Code**

Open your terminal and run:

```bash
claude mcp add --transport http quake-coding-arena http://localhost:6487/mcp
```

This registers the server with Claude Code.

### **Step 3: Start Claude Code Session**

Launch Claude Code:

```bash
claude
```

### **Step 4: Verify Connection**

In Claude Code, type:

```bash
/mcp
```

This lists available MCP servers. You should see `quake-coding-arena` in the list.

---

## 📋 **Alternative: Using Local Build**

If you prefer not to run the HTTP server, use the local build:

```bash
claude mcp add quake-coding-arena node /Users/gurindersingh/Documents/Developer/Quake-Coding-Arena-MCP/.smithery/index.cjs
```

---

## 🎮 **Using the Server**

Once connected, you can use achievements in Claude Code:

```
"Play GODLIKE achievement"
"Trigger FIRST BLOOD sound"
"Set voice to female and play HEADSHOT"
"Show me all available achievements"
"Get my achievement statistics"
```

---

## 🔧 **Configuration Commands**

### **List MCP Servers:**
```bash
claude mcp list
```

### **Remove MCP Server:**
```bash
claude mcp remove quake-coding-arena
```

### **Update MCP Server:**
```bash
claude mcp update quake-coding-arena --transport http http://localhost:6487/mcp
```

---

## 📍 **Current Server Info**

- **Port:** 6487 (or as shown in terminal)
- **MCP Endpoint:** `http://localhost:6487/mcp`
- **Status:** Running ✅

---

## 🎯 **Available Tools**

Once connected, Claude Code will have access to:

1. **play_enhanced_quake_sound** - Play specific achievement
2. **random_enhanced_achievement** - Random celebration
3. **list_enhanced_achievements** - List all achievements
4. **set_voice_pack** - Switch male/female voice
5. **get_voice_pack_info** - Check current voice
6. **set_enhanced_volume** - Adjust volume (0-100)
7. **get_enhanced_achievement_stats** - Session statistics
8. **get_enhanced_achievement_guide** - Achievement guide
9. **get_ai_usage_guide** - Usage tips
10. **test_voice_packs** - Test audio setup

---

## 🎮 **25 Epic Achievements**

### **Streak (4):**
- RAMPAGE, DOMINATING, UNSTOPPABLE, GODLIKE

### **Quality (3):**
- EXCELLENT, PERFECT, IMPRESSIVE

### **Multi-Kill (9):**
- HEADSHOT, MULTI KILL, KILLING SPREE, ULTRA KILL, MONSTER KILL, LUDICROUS KILL, WICKED SICK, DOUBLE KILL, TRIPLE KILL

### **Game Events (5):**
- FIRST BLOOD, HUMILIATION, HOLY SHIT, BOTTOM FEEDER, PLAY

### **Team (2):**
- PREPARE TO FIGHT, PLAY

---

## 🔧 **Troubleshooting**

### **Server Not Found:**
```bash
# Check if server is running
curl http://localhost:6487/mcp

# If not running, start it:
cd /Users/gurindersingh/Documents/Developer/Quake-Coding-Arena-MCP
npm run dev
```

### **Port Conflict:**
```bash
# Use a different port
PORT=8082 npm run dev

# Then update Claude Code:
claude mcp update quake-coding-arena --transport http http://localhost:8082/mcp
```

### **Connection Issues:**
1. Verify server is running: `curl http://localhost:6487/mcp`
2. Check port matches: Server shows port 6487
3. Restart Claude Code session

---

## 💡 **Pro Tips**

1. **Keep server running:** The HTTP endpoint only works while `npm run dev` is running
2. **Check port:** If you restart, the port might change - update the MCP config
3. **Use environment variable:** `PORT=6487 npm run dev` to keep port consistent
4. **Test connection:** Use `curl http://localhost:6487/mcp` to verify server

---

## 📚 **Documentation**

- **Claude Code MCP Docs:** https://docs.claude.com/en/docs/claude-code/mcp
- **Server running on:** `http://localhost:6487/mcp`

---

**Last Updated:** December 10, 2025  
**Server Port:** 6487 (or as shown in terminal)


# 🎯 Claude Code (Cursor) - HTTP MCP Setup Guide

**Connect to Enhanced Quake Coding Arena MCP Server via HTTP**

---

## 🌐 **Using HTTP Endpoint (Port 6487)**

When your server is running on `http://localhost:6487/mcp`, here's how to connect in Claude Code (Cursor):

---

## 📋 **Method 1: Cursor Settings UI**

### **Step 1: Open Cursor Settings**
1. Open **Cursor IDE**
2. Press `Cmd + ,` (Mac) or `Ctrl + ,` (Windows/Linux)
3. Search for **"MCP"** or **"Model Context Protocol"**

### **Step 2: Add HTTP Server**
1. Click **"Add MCP Server"** or **"Configure MCP"**
2. Select **"HTTP"** or **"Remote"** transport type
3. Enter configuration:

```json
{
  "name": "quake-coding-arena",
  "transport": "http",
  "url": "http://localhost:6487/mcp"
}
```

---

## 📋 **Method 2: Manual Configuration File**

### **Step 1: Find Cursor Config File**

**macOS:**
```
~/Library/Application Support/Cursor/User/globalStorage/mcp.json
```

**Windows:**
```
%APPDATA%\Cursor\User\globalStorage\mcp.json
```

**Linux:**
```
~/.config/Cursor/User/globalStorage/mcp.json
```

### **Step 2: Add HTTP Configuration**

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "quake-coding-arena": {
      "transport": "http",
      "url": "http://localhost:6487/mcp",
      "description": "🎯 Enhanced Quake Coding Arena - 25 achievements with dual voice system"
    }
  }
}
```

---

## 📋 **Method 3: Using Smithery Dev URL**

If you're using `npm run dev:smithery`, Smithery provides a remote URL:

```json
{
  "mcpServers": {
    "quake-coding-arena": {
      "transport": "http",
      "url": "https://5072ab04.ngrok.smithery.ai/mcp",
      "description": "🎯 Enhanced Quake Coding Arena via Smithery"
    }
  }
}
```

**Note:** The ngrok URL changes each time you restart `npm run dev:smithery`

---

## 🚀 **Quick Start**

### **1. Start the Server**

```bash
# Option A: Interactive dev server (asks for port)
npm run dev

# Option B: Smithery dev (auto port selection)
npm run dev:smithery

# Option C: Custom port
PORT=6487 npm run dev
```

### **2. Note the Port**

The server will display:
```
🎮 ✨ Quake Coding Arena MCP Server starting!
📍 Running on port 6487
🌐 MCP endpoint: http://localhost:6487/mcp
```

### **3. Configure Cursor**

Use the MCP endpoint URL in Cursor configuration:
- **URL:** `http://localhost:6487/mcp`

### **4. Restart Cursor**

Restart Cursor IDE to load the MCP server connection.

---

## ✅ **Verification**

After configuring, you should be able to:

1. **See the server in Cursor:**
   - Check MCP server status in Cursor settings
   - Should show "Connected" or "Active"

2. **Use achievements in chat:**
   ```
   "Play GODLIKE achievement"
   "Trigger FIRST BLOOD sound"
   "Set voice to female and play HEADSHOT"
   ```

3. **Check available tools:**
   - Cursor should show 10 MCP tools available
   - Tools like `play_enhanced_quake_sound`, `set_voice_pack`, etc.

---

## 🔧 **Troubleshooting**

### **Issue: Server not connecting**

**Solutions:**
1. Verify server is running:
   ```bash
   curl http://localhost:6487/mcp
   ```

2. Check port number matches:
   - Server shows: `port 6487`
   - Cursor config uses: `http://localhost:6487/mcp`

3. Check firewall/network:
   - Ensure localhost connections are allowed
   - Try `127.0.0.1:6487` instead of `localhost:6487`

### **Issue: Port conflict**

**Solution:**
```bash
# Use a different port
PORT=8082 npm run dev

# Then update Cursor config to:
# "url": "http://localhost:8082/mcp"
```

### **Issue: Cursor doesn't support HTTP transport**

**Solution:**
Use local build instead:
```json
{
  "mcpServers": {
    "quake-coding-arena": {
      "command": "node",
      "args": ["/path/to/.smithery/index.cjs"]
    }
  }
}
```

---

## 📚 **Alternative: Local Build Connection**

If HTTP transport doesn't work in Cursor, use the local build:

```json
{
  "mcpServers": {
    "quake-coding-arena": {
      "command": "node",
      "args": ["/Users/gurindersingh/Documents/Developer/Quake-Coding-Arena-MCP/.smithery/index.cjs"],
      "description": "🎯 Enhanced Quake Coding Arena"
    }
  }
}
```

**Path:** Use absolute path to `.smithery/index.cjs`

---

## 🎯 **Current Server Status**

Your server is running on:
- **Port:** 6487
- **MCP Endpoint:** `http://localhost:6487/mcp`
- **Config Endpoint:** `http://localhost:6487/.well-known/mcp-config`

**Add this to Cursor:**
```json
{
  "transport": "http",
  "url": "http://localhost:6487/mcp"
}
```

---

## 💡 **Pro Tips**

1. **Keep server running:** The HTTP endpoint only works while `npm run dev` is running
2. **Check port:** If you restart, the port might change - update Cursor config
3. **Use environment variable:** `PORT=6487 npm run dev` to keep port consistent
4. **Test connection:** Use `curl http://localhost:6487/mcp` to verify server is responding

---

**Last Updated:** December 10, 2025  
**Server Port:** 6487 (or as shown in terminal)


# 🔧 Smithery Installation Fix

## ❌ **The Problem**

When trying to use:
```bash
npx @Ripnrip/quake-coding-arena-mcp
```

You get:
```
npm error 404 Not Found - GET https://registry.npmjs.org/@Ripnrip%2fquake-coding-arena-mcp
npm error 404 name can no longer contain capital letters
```

## ✅ **The Solution**

**Smithery packages are NOT on npm!** They use HTTP endpoints, not npx.

---

## 🎯 **Correct Installation Methods**

### **Method 1: HTTP Endpoint (Recommended for Smithery)**

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "quake-coding-arena": {
      "transport": "http",
      "url": "https://server.smithery.ai/@Ripnrip/quake-coding-arena-mcp/mcp"
    }
  }
}
```

**Location:**
- **Claude Desktop:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Cursor:** `~/Library/Application Support/Cursor/User/globalStorage/kilocode.kilo-code/settings/mcp_settings.json`

---

### **Method 2: Local Build (For Development/Testing)**

If you want to use it locally without HTTP:

```bash
# Clone the repo
git clone https://github.com/Ripnrip/Quake-Coding-Arena-MCP.git
cd Quake-Coding-Arena-MCP

# Run setup script (auto-configures everything)
./setup-local.sh
```

This automatically:
- Installs dependencies
- Builds the server
- Configures your MCP client with the correct path

---

### **Method 3: Use Setup Script**

```bash
# Clone repo
git clone https://github.com/Ripnrip/Quake-Coding-Arena-MCP.git
cd Quake-Coding-Arena-MCP

# Run remote setup (configures for Smithery)
./setup-remote.sh
```

---

## 🔍 **Why npx Doesn't Work**

1. **Not on npm:** Smithery packages are hosted on Smithery's infrastructure, not npm registry
2. **Capital letters:** Even if it were on npm, `@Ripnrip` has a capital R, which npm doesn't allow
3. **Different system:** Smithery uses HTTP endpoints, not npm packages

---

## 📋 **Quick Reference**

| Method | Command | Works? |
|--------|---------|--------|
| ❌ `npx @Ripnrip/quake-coding-arena-mcp` | npm registry | **NO** - Not on npm |
| ✅ HTTP Endpoint | `https://server.smithery.ai/@Ripnrip/quake-coding-arena-mcp/mcp` | **YES** - Smithery |
| ✅ Local Build | `./setup-local.sh` | **YES** - Local development |
| ✅ Setup Script | `./setup-remote.sh` | **YES** - Auto-configures |

---

## 🎯 **Recommended Approach**

**For End Users:**
- Use **HTTP Endpoint** method (Method 1)
- Just add the HTTP URL to your MCP config
- No installation needed!

**For Developers:**
- Use **Local Build** method (Method 2)
- Clone repo and run `./setup-local.sh`
- Full control and customization

---

## ✅ **Summary**

**Don't use:** `npx @Ripnrip/quake-coding-arena-mcp` ❌

**Use instead:**
- HTTP endpoint: `https://server.smithery.ai/@Ripnrip/quake-coding-arena-mcp/mcp` ✅
- Or local build: `./setup-local.sh` ✅

---

**Last Updated:** December 10, 2025


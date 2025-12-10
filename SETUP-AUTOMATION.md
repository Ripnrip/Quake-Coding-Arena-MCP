# 🔧 Setup Automation Guide

**Understanding what's automated vs manual for different installation methods**

---

## 📦 **Installation Methods Comparison**

### **1. Smithery Installation (Automatic Setup)**

When users install via Smithery, **NO manual configuration needed!**

```bash
# User just runs:
npx @Ripnrip/quake-coding-arena-mcp
```

**What happens:**
- ✅ Smithery handles the package installation
- ✅ The `package.json` MCP config is automatically used
- ✅ Users can add to their MCP config with just:
  ```json
  {
    "mcpServers": {
      "quake-coding-arena": {
        "command": "npx",
        "args": ["@Ripnrip/quake-coding-arena-mcp"]
      }
    }
  }
  ```
- ✅ **No path configuration needed** - works from anywhere!

**Advantages:**
- ✅ Zero setup - just install and use
- ✅ Always up-to-date (uses latest version)
- ✅ Works on any system
- ✅ No local build required

---

### **2. GitHub Repo Download (Semi-Automatic Setup)**

When users clone/download the repo, they need to run setup scripts:

```bash
# Clone the repo
git clone https://github.com/Ripnrip/Quake-Coding-Arena-MCP.git
cd Quake-Coding-Arena-MCP

# Run setup script (automatically configures Claude Desktop)
./setup-local.sh
```

**What happens:**
- ✅ Script installs dependencies (`npm install`)
- ✅ Script builds the server (`npm run build`)
- ✅ Script **automatically adds to Claude Desktop config** with correct path
- ✅ Path is automatically calculated based on where they cloned the repo

**The setup script does:**
```bash
# Automatically finds the repo location
LOCAL_SERVER_PATH="$(pwd)/.smithery/index.cjs"

# Automatically adds to Claude Desktop config
jq ".mcpServers.\"quake-coding-arena-local\" = {
  \"command\": \"node\",
  \"args\": [\"$LOCAL_SERVER_PATH\"]
}" ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Advantages:**
- ✅ Automated configuration via setup script
- ✅ Works for local development
- ✅ Can customize and modify code

**Disadvantages:**
- ⚠️ Requires running setup script
- ⚠️ Path is specific to their machine
- ⚠️ Need to rebuild if code changes

---

## 🔍 **Key Differences**

| Feature | Smithery | Repo Download |
|---------|----------|---------------|
| **Installation** | `npx @Ripnrip/quake-coding-arena-mcp` | `git clone` + `./setup-local.sh` |
| **Configuration** | Automatic (via package.json) | Automatic (via setup script) |
| **Path Setup** | Not needed (uses npx) | Auto-calculated by script |
| **Updates** | Automatic (latest version) | Manual (git pull + rebuild) |
| **Customization** | Limited | Full access to source |

---

## 📋 **What Gets Configured Automatically**

### **For Smithery Users:**
```json
{
  "mcpServers": {
    "quake-coding-arena": {
      "command": "npx",
      "args": ["@Ripnrip/quake-coding-arena-mcp"]
    }
  }
}
```
- ✅ **No path needed** - npx handles it
- ✅ **Works from anywhere** - no absolute paths
- ✅ **Always latest** - uses registry version

### **For Repo Users (via setup script):**
```json
{
  "mcpServers": {
    "quake-coding-arena-local": {
      "command": "node",
      "args": ["/Users/username/path/to/repo/.smithery/index.cjs"]
    }
  }
}
```
- ✅ **Path auto-calculated** - script uses `$(pwd)`
- ✅ **Specific to their machine** - uses their repo location
- ✅ **Works immediately** - no npx needed

---

## 🎯 **Recommendation for Users**

### **For End Users (Just Want to Use It):**
```bash
# Use Smithery - easiest option
# Just add to MCP config:
{
  "mcpServers": {
    "quake-coding-arena": {
      "command": "npx",
      "args": ["@Ripnrip/quake-coding-arena-mcp"]
    }
  }
}
```

### **For Developers (Want to Customize):**
```bash
# Clone repo and run setup
git clone https://github.com/Ripnrip/Quake-Coding-Arena-MCP.git
cd Quake-Coding-Arena-MCP
./setup-local.sh
```

---

## ✅ **Summary**

**Smithery Installation:**
- ✅ **Fully automatic** - no setup scripts needed
- ✅ **No path configuration** - uses npx
- ✅ **Works identically** for all users

**Repo Download:**
- ✅ **Semi-automatic** - run `./setup-local.sh`
- ✅ **Auto-configures** Claude Desktop with correct path
- ✅ **Path is calculated** based on where they cloned

**Both methods result in the same working configuration!** 🎉

---

**Last Updated:** December 10, 2025


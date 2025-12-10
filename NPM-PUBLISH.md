# 📦 Publishing to npm Registry

**Guide for publishing Enhanced Quake Coding Arena MCP to npm**

---

## ✅ **Package Configuration**

The package is now configured for npm publishing:

- **Package Name:** `@ripnrip/quake-coding-arena-mcp` (lowercase, npm-compatible)
- **Version:** `2.2.0`
- **Entry Point:** `.smithery/index.cjs` (built file)
- **Bin Command:** `quake-arena-mcp`

---

## 🚀 **Publishing Steps**

### **1. Prerequisites**

```bash
# Make sure you're logged into npm
npm login

# Verify you're logged in
npm whoami
```

### **2. Build the Package**

```bash
# Build the server (required before publishing)
npm run build

# Verify build output exists
ls -la .smithery/index.cjs
```

### **3. Test Locally (Optional)**

```bash
# Test the package locally before publishing
npm pack

# This creates a .tgz file you can test
npm install -g ./quake-coding-arena-mcp-2.2.0.tgz

# Test it works
npx @ripnrip/quake-coding-arena-mcp
```

### **4. Publish to npm**

```bash
# Dry run (see what would be published)
npm publish --dry-run

# Publish to npm
npm publish --access public
```

**Note:** The `--access public` flag is required for scoped packages (`@ripnrip/...`)

---

## 📋 **What Gets Published**

The `files` array in `package.json` controls what's included:

```json
{
  "files": [
    ".smithery/",    // Built server
    "sounds/",       // Audio files
    "README.md",     // Documentation
    "package.json"   // Package metadata
  ]
}
```

**Included:**
- ✅ Built server (`.smithery/index.cjs`)
- ✅ All sound files (`sounds/male/` and `sounds/female/`)
- ✅ README.md
- ✅ package.json

**Excluded:**
- ❌ Source TypeScript files (`src/`)
- ❌ Development dependencies
- ❌ Test files
- ❌ Build configs

---

## 🎯 **After Publishing**

### **Users Can Install:**

```bash
# Via npx (recommended)
npx @ripnrip/quake-coding-arena-mcp

# Or install globally
npm install -g @ripnrip/quake-coding-arena-mcp
quake-arena-mcp

# Or add to package.json
npm install @ripnrip/quake-coding-arena-mcp
```

### **MCP Configuration:**

Users can add to their MCP config:

```json
{
  "mcpServers": {
    "quake-coding-arena": {
      "command": "npx",
      "args": ["@ripnrip/quake-coding-arena-mcp"]
    }
  }
}
```

---

## 🔄 **Updating the Package**

### **Version Bump:**

```bash
# Patch version (2.2.0 -> 2.2.1)
npm version patch

# Minor version (2.2.0 -> 2.3.0)
npm version minor

# Major version (2.2.0 -> 3.0.0)
npm version major
```

### **Publish Update:**

```bash
# Build and publish
npm run build
npm publish --access public
```

---

## ✅ **Verification**

After publishing, verify it works:

```bash
# Test installation
npx @ripnrip/quake-coding-arena-mcp

# Check package info
npm view @ripnrip/quake-coding-arena-mcp

# View on npm website
# https://www.npmjs.com/package/@ripnrip/quake-coding-arena-mcp
```

---

## 🎯 **Package Name**

**npm Package:** `@ripnrip/quake-coding-arena-mcp` (lowercase)

**Why lowercase?**
- npm doesn't allow capital letters in package names
- Scoped packages must be lowercase
- Matches npm naming conventions

**Usage:**
```bash
npx @ripnrip/quake-coding-arena-mcp
```

---

## 📝 **Notes**

1. **Build Required:** Always run `npm run build` before publishing
2. **Scoped Package:** Requires `--access public` flag
3. **Version:** Update version in package.json before publishing
4. **Files:** Only files listed in `files` array are included

---

## 🚨 **Troubleshooting**

### **Error: Package name contains capital letters**
- ✅ Fixed: Package name is now `@ripnrip/quake-coding-arena-mcp` (all lowercase)

### **Error: 404 Not Found**
- Make sure you've published first: `npm publish --access public`
- Check package name is correct: `@ripnrip/quake-coding-arena-mcp`

### **Error: Build file missing**
- Run `npm run build` before publishing
- Verify `.smithery/index.cjs` exists

---

**Last Updated:** December 10, 2025


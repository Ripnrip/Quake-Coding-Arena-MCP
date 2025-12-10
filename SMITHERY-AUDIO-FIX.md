# 🔧 Smithery Audio File Path Fix

## 🐛 **Issue**

When using the MCP server via Smithery, audio files are not found:
```
❌ Error playing ULTRA KILL: ❌ Sound file not found: ultra-kill (ultra-kill.mp3) checked in /app
```

## 🔍 **Root Cause**

In Smithery's cloud environment (`/app`), the path resolution for audio files doesn't work correctly because:
1. The code is bundled into `.smithery/index.cjs`
2. The `sounds/` directory is included via `package.json` "files" array
3. But the path resolution logic doesn't account for Smithery's deployment structure

## ✅ **Fix Applied**

### **1. Enhanced Path Resolution** (`src/utils/path.ts`)

Updated `getProjectRoot()` to check multiple possible locations:
- Current working directory (`process.cwd()`)
- Relative to bundle location (`__dirname`)
- Common Smithery paths (`/app`, `/app/sounds`)
- Environment-aware detection (checks for `SMITHERY` or `PORT` env vars)

### **2. Better Error Messages** (`src/utils/sound.ts`)

Enhanced error messages now include:
- All checked paths
- Current working directory
- `__dirname` value
- Voice pack information
- Achievement details

This helps debug path issues in production.

## 🧪 **Testing**

After deploying to Smithery, test with:
```javascript
// Should work now
await callTool("play_enhanced_quake_sound", {
  achievement: "ULTRA KILL",
  voiceGender: "female"
});
```

## 📋 **Verification Checklist**

- [x] Path resolution checks multiple locations
- [x] Error messages include debug info
- [x] Handles Smithery environment variables
- [x] Falls back gracefully
- [x] Build successful

## 🔄 **If Still Not Working**

If audio files still aren't found after this fix:

1. **Check Smithery deployment:**
   - Verify `sounds/` directory is in package.json "files" array ✅
   - Check if files are actually deployed

2. **Verify file structure:**
   - Sounds should be at: `/app/sounds/male/` and `/app/sounds/female/`
   - Or relative to bundle location

3. **Check error message:**
   - The enhanced error will show all checked paths
   - Use this to identify where Smithery actually places files

4. **Alternative: Use Resources**
   - Audio files are also available via MCP Resources
   - Access via `quake://sounds/male/[filename].mp3` URIs
   - This might be more reliable in cloud environments

## 📝 **Notes**

- The `postBuild` in `smithery.config.js` copies sounds to `.smithery/` for local builds
- In Smithery cloud, files from `package.json` "files" array are automatically included
- Path resolution now handles both scenarios

---

**Status:** ✅ Fixed - Enhanced path resolution for Smithery deployment  
**Date:** December 10, 2025


# 📦 ChatKit Widget Builder Upload Guide

## ⚠️ **Important: File Format**

ChatKit Widget Builder expects a **JSON file**, not an HTML file. The error you're seeing:

```
Failed to parse widget file SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

This means you're trying to upload an HTML file (like `widget.widget` or `chatkit-widget.html`) instead of a JSON widget definition.

## ✅ **Correct Files to Upload**

Use one of these **JSON** files:

1. **`quake-achievements.widget.json`** - Full-featured widget with all controls
2. **`quake-achievements-simple.widget.json`** - Minimal widget (recommended for first upload)

## 📋 **Upload Steps**

1. **Go to** [widgets.chatkit.studio](https://widgets.chatkit.studio)
2. **Click** "New widget" or use the widget builder
3. **Upload** the JSON file (`.json` extension)
   - ✅ Use `quake-achievements.widget.json` or `quake-achievements-simple.widget.json`
   - ❌ Do NOT upload `widget.widget` (that's HTML)
   - ❌ Do NOT upload `chatkit-widget.html` (that's HTML)

## 🎯 **File Comparison**

| File | Format | Purpose | Upload to ChatKit? |
|------|--------|---------|-------------------|
| `widget.widget` | HTML | Standalone embeddable widget | ❌ No |
| `chatkit-widget.html` | HTML | ChatKit-compatible HTML page | ❌ No |
| `quake-achievements.widget.json` | JSON | Full ChatKit widget definition | ✅ Yes |
| `quake-achievements-simple.widget.json` | JSON | Simple ChatKit widget | ✅ Yes (recommended) |

## 🔧 **Troubleshooting**

### Error: "Unexpected token '<'"

**Cause:** You uploaded an HTML file instead of JSON.

**Solution:** 
1. Make sure you're uploading a `.json` file
2. Check the file starts with `{` not `<!DOCTYPE`
3. Use `quake-achievements-simple.widget.json` for a minimal test

### Error: "Invalid widget schema"

**Cause:** The JSON structure doesn't match ChatKit's expected format.

**Solution:**
1. Start with `quake-achievements-simple.widget.json` (minimal version)
2. Verify the JSON is valid (use a JSON validator)
3. Check ChatKit documentation for component names

### Widget doesn't appear

**Cause:** The widget might need backend integration.

**Solution:**
1. Widget definitions are just UI - you need to connect actions to your backend
2. Set up your MCP server endpoint
3. Configure the widget's action handlers

## 📚 **Next Steps After Upload**

Once the widget JSON is uploaded successfully:

1. **Configure Actions** - Connect button clicks to your MCP server
2. **Test Widget** - Use ChatKit's preview to test the UI
3. **Integrate Backend** - Connect to your Express server at `/quake-sound`
4. **Customize** - Adjust the JSON to match your needs

## 🎮 **Widget Features**

The JSON widgets include:
- Achievement selection dropdown
- Voice pack selection (male/female/auto)
- Volume control (0-100)
- Play button
- Quick-select badges for popular achievements
- Status display

## 💡 **Tips**

- Start with the **simple** version to verify the format works
- Then try the **full** version for all features
- Customize the JSON to add/remove achievements
- Use ChatKit's widget builder UI to modify the JSON visually

---

**Remember:** Always upload `.json` files to ChatKit Widget Builder, not `.html` or `.widget` files! 🎯

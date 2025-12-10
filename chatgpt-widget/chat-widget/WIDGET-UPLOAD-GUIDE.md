# 📦 ChatKit Widget Builder Upload Guide

## ⚠️ **Important: File Format**

ChatKit Widget Builder expects a **JSON file**, not an HTML file. The error you're seeing:

```
Failed to parse widget file SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

This means you're trying to upload an HTML file (like `widget.widget` or `chatkit-widget.html`) instead of a JSON widget definition.

## ✅ **Correct Files to Upload**

Use one of these **JSX** files (ChatKit Widget Builder format):

1. **`quake-achievements.widget.jsx`** - Full-featured widget with all controls
2. **`quake-achievements-simple.widget.jsx`** - Minimal widget (recommended for first upload)

**Alternative JSON format** (if JSX doesn't work):
- `quake-achievements.widget.json` - Full-featured JSON widget
- `quake-achievements-simple.widget.json` - Simple JSON widget

## 📋 **Upload Steps**

1. **Go to** [widgets.chatkit.studio](https://widgets.chatkit.studio)
2. **Click** "New widget" or use the widget builder
3. **Upload** the JSX file (`.jsx` extension) - **Recommended**
   - ✅ Use `quake-achievements.widget.jsx` or `quake-achievements-simple.widget.jsx`
   - ✅ Or use `quake-achievements.widget.json` or `quake-achievements-simple.widget.json` (JSON format)
   - ❌ Do NOT upload `widget.widget` (that's HTML)
   - ❌ Do NOT upload `chatkit-widget.html` (that's HTML)

## 🎯 **File Comparison**

| File | Format | Purpose | Upload to ChatKit? |
|------|--------|---------|-------------------|
| `widget.widget` | HTML | Standalone embeddable widget | ❌ No |
| `chatkit-widget.html` | HTML | ChatKit-compatible HTML page | ❌ No |
| `quake-achievements.widget.jsx` | JSX | Full ChatKit widget (JSX format) | ✅ Yes (recommended) |
| `quake-achievements-simple.widget.jsx` | JSX | Simple ChatKit widget (JSX format) | ✅ Yes |
| `quake-achievements.widget.json` | JSON | Full ChatKit widget (JSON format) | ✅ Yes (alternative) |
| `quake-achievements-simple.widget.json` | JSON | Simple ChatKit widget (JSON format) | ✅ Yes (alternative) |

## 🔧 **Troubleshooting**

### Error: "Unexpected token '<'"

**Cause:** You uploaded an HTML file instead of JSX/JSON.

**Solution:** 
1. Make sure you're uploading a `.jsx` or `.json` file
2. Check the file starts with `<Card` (JSX) or `{` (JSON), not `<!DOCTYPE`
3. Use `quake-achievements-simple.widget.jsx` for a minimal test

### Error: "Invalid widget schema"

**Cause:** The JSX/JSON structure doesn't match ChatKit's expected format.

**Solution:**
1. Start with `quake-achievements-simple.widget.jsx` (minimal JSX version)
2. Verify the JSX syntax matches ChatKit's component format
3. Check ChatKit documentation for component names and props
4. If using JSON, verify the JSON is valid (use a JSON validator)

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

- Start with the **simple JSX** version (`quake-achievements-simple.widget.jsx`) to verify the format works
- Then try the **full JSX** version for all features
- JSX format matches ChatKit's component syntax (like React)
- Customize the JSX to add/remove achievements
- Use ChatKit's widget builder UI to modify the widget visually
- If JSX doesn't work, try the JSON versions as fallback

---

**Remember:** Always upload `.jsx` or `.json` files to ChatKit Widget Builder, not `.html` or `.widget` files! 🎯

# 🌐 GitHub Pages Setup Guide

**Enhanced Quake Coding Arena - Static Website Deployment**

---

## ✅ **Current Status**

The website is **ready for GitHub Pages deployment**! All files are configured correctly.

### **Files Ready:**
- ✅ `index.html` - Main website file
- ✅ `script.js` - Interactive soundboard (uses raw.githubusercontent.com URLs)
- ✅ `style.css` - Styling
- ✅ `.nojekyll` - Disables Jekyll processing

### **Features:**
- ✅ 25 Epic Achievements
- ✅ Dual Voice System (Male/Female toggle)
- ✅ Category Filtering
- ✅ Volume Control
- ✅ Responsive Design

---

## 🚀 **Setup Instructions**

### **Step 1: Enable GitHub Pages**

1. Go to your repository: `https://github.com/Ripnrip/Quake-Coding-Arena-MCP`
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**

### **Step 2: Wait for Deployment**

- GitHub will build and deploy your site (usually takes 1-2 minutes)
- You'll see a green checkmark when deployment is complete
- Your site will be available at:
  ```
  https://ripnrip.github.io/Quake-Coding-Arena-MCP/
  ```

### **Step 3: Verify It Works**

1. Visit your GitHub Pages URL
2. Test the soundboard:
   - Toggle between Male/Female voices
   - Click achievement buttons
   - Adjust volume slider
   - Filter by category

---

## 🔍 **How It Works**

### **Audio File Loading**

The website uses **raw.githubusercontent.com** URLs to load audio files directly from your repository:

```javascript
// Male sounds
https://raw.githubusercontent.com/Ripnrip/Quake-Coding-Arena-MCP/main/sounds/male/[filename].mp3

// Female sounds
https://raw.githubusercontent.com/Ripnrip/Quake-Coding-Arena-MCP/main/sounds/female/[filename].mp3
```

### **Why This Works**

- ✅ No server needed - static files only
- ✅ Audio files served directly from GitHub
- ✅ Works with GitHub Pages free hosting
- ✅ No CORS issues (same origin)

---

## 🧪 **Testing Locally**

Before deploying, test locally:

### **Option 1: Python HTTP Server**
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### **Option 2: Node.js Serve**
```bash
npx serve .
# Visit: http://localhost:3000
```

### **Option 3: PHP Server**
```bash
php -S localhost:8000
# Visit: http://localhost:8000
```

---

## 📋 **Troubleshooting**

### **Issue: Audio files don't play**

**Solution:**
1. Verify audio files are in the repository:
   - Check `sounds/male/` has 15 files
   - Check `sounds/female/` has 16 files
2. Verify file names match exactly (case-sensitive)
3. Check browser console for errors

### **Issue: Website shows 404**

**Solution:**
1. Ensure GitHub Pages is enabled
2. Check branch is set to `main`
3. Wait a few minutes for deployment
4. Clear browser cache

### **Issue: Styles not loading**

**Solution:**
1. Verify `style.css` is in root directory
2. Check `.nojekyll` file exists
3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

### **Issue: Jekyll processing errors**

**Solution:**
- The `.nojekyll` file should prevent this
- If issues persist, ensure `.nojekyll` is in root directory

---

## 🎯 **Custom Domain (Optional)**

To use a custom domain:

1. Add `CNAME` file to root with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add CNAME record pointing to `ripnrip.github.io`

3. Update GitHub Pages settings:
   - Add custom domain in Pages settings

---

## 📊 **Website Features**

### **Achievement Categories:**
- 🔥 **Streak** - RAMPAGE, DOMINATING, UNSTOPPABLE, GODLIKE
- ✨ **Quality** - EXCELLENT, PERFECT, IMPRESSIVE (Male only)
- ⚔️ **Multi-Kill** - HEADSHOT, MULTI KILL, KILLING SPREE, etc.
- 🎪 **Game** - FIRST BLOOD, HUMILIATION, HOLY SHIT, BOTTOM FEEDER
- 👥 **Team** - PREPARE TO FIGHT, PLAY

### **Voice Packs:**
- **Male:** 15 classic Quake 3 Arena sounds
- **Female:** 16 unique female announcer sounds

### **Controls:**
- Voice toggle (Male/Female)
- Category filters
- Volume slider (0-100%)
- Achievement buttons

---

## 🔗 **Links**

- **Repository:** https://github.com/Ripnrip/Quake-Coding-Arena-MCP
- **GitHub Pages URL:** https://ripnrip.github.io/Quake-Coding-Arena-MCP/
- **Raw Audio Files:** https://raw.githubusercontent.com/Ripnrip/Quake-Coding-Arena-MCP/main/sounds/

---

## ✅ **Verification Checklist**

Before deploying, verify:

- [x] `index.html` exists in root
- [x] `script.js` exists in root
- [x] `style.css` exists in root
- [x] `.nojekyll` file exists
- [x] Audio files are in repository
- [x] All 25 achievements defined in script.js
- [x] GitHub Pages enabled in settings
- [x] Branch set to `main`
- [x] Root directory selected

---

## 🎉 **Success!**

Once deployed, your website will be live at:
```
https://ripnrip.github.io/Quake-Coding-Arena-MCP/
```

Share it with the world! 🚀

---

**Last Updated:** December 10, 2025  
**Status:** ✅ Ready for GitHub Pages Deployment


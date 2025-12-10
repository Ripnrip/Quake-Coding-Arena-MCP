# Enhanced Quake Coding Arena - GitHub Pages

This directory contains the static website for GitHub Pages deployment.

## Setup for GitHub Pages

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Select source: "Deploy from a branch"
   - Choose branch: `main` (or your default branch)
   - Select folder: `/ (root)` or `/docs` if using docs folder

2. **Files included:**
   - `index.html` - Main soundboard interface
   - `script.js` - Soundboard functionality
   - `style.css` - Styling
   - `.nojekyll` - Disable Jekyll processing

3. **Access your site:**
   - URL: `https://[username].github.io/Quake-Coding-Arena-MCP/`

## Features

- ✅ 25 Epic Achievements
- ✅ Dual Voice System (15 Male + 16 Female sounds)
- ✅ Category Filtering
- ✅ Volume Control
- ✅ Responsive Design
- ✅ GitHub Pages Ready

## Local Testing

To test locally before deploying:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`


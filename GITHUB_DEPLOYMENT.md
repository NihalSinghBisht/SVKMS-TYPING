# 🚀 GitHub Deployment Guide

## Option 1: Static Website (Recommended for GitHub Pages)

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `SVKM_Typing_Test`
5. Make it **Public** (required for free GitHub Pages)
6. Check "Add a README file"
7. Click "Create repository"

### Step 2: Upload Files
1. Go to your new repository
2. Click "uploading an existing file"
3. Upload all files from the `static-version` folder:
   - `index.html`
   - `script.js`
   - `style.css`
   - `README.md`

### Step 3: Enable GitHub Pages
1. Go to your repository settings (Settings tab)
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Select "main" branch and "/ (root)" folder
5. Click "Save"
6. Wait 2-3 minutes for deployment

### Step 4: Access Your Website
Your website will be available at:
`https://yourusername.github.io/SVKM_Typing_Test`

---

## Option 2: Flask App with Heroku (For Full Backend)

### Step 1: Prepare for Heroku
1. Create a `Procfile` in your main directory:
```
web: python app.py
```

2. Update `app.py` to use environment variables:
```python
import os
port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port, debug=False)
```

### Step 2: Deploy to Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Deploy: `git push heroku main`

---

## Option 3: Flask App with Railway

### Step 1: Prepare for Railway
1. Create `railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python app.py",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Step 2: Deploy
1. Connect your GitHub repository to Railway
2. Railway will automatically detect Python and deploy

---

## Recommended: Static Version

For the easiest deployment and best performance, I recommend using the **static version** (Option 1) because:

✅ **No server costs** - Completely free  
✅ **Fast loading** - No backend processing  
✅ **Easy maintenance** - Just HTML/CSS/JS  
✅ **Works offline** - Once loaded, works without internet  
✅ **GitHub Pages** - Free hosting with custom domain support  

The static version includes all the core features:
- Student login with college selection
- 3-attempt typing test system
- Local leaderboard with college filtering
- Results saved in browser storage
- Modern, responsive UI

---

## Quick Start Commands

```bash
# Clone your repository
git clone https://github.com/yourusername/SVKM_Typing_Test.git

# Navigate to static version
cd SVKM_Typing_Test/static-version

# Open in browser
start index.html  # Windows
open index.html   # Mac
```

Your website is now ready to be shared with SVKM students! 🎉



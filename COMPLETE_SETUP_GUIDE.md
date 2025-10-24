# 🚀 Complete Setup Guide for SVKM Typing Test

## Step 1: Install Git (Required for GitHub)

### Download Git for Windows:
1. Go to [git-scm.com](https://git-scm.com/download/win)
2. Download the latest version
3. Run the installer with default settings
4. **Restart your computer** after installation

### Verify Installation:
Open a new Command Prompt or PowerShell and run:
```bash
git --version
```
You should see something like `git version 2.x.x`

---

## Step 2: Create GitHub Repository

### Option A: Using GitHub Website (Easiest)
1. Go to [github.com](https://github.com) and sign up/login
2. Click the "+" icon → "New repository"
3. Repository name: `SVKM_Typing_Test`
4. Description: `Typing test competition for SVKM students`
5. Make it **Public** (required for free hosting)
6. Check "Add a README file"
7. Click "Create repository"

### Option B: Using Git Commands
```bash
# Navigate to your project folder
cd "C:\Users\Tanvir\Documents\SVKM_Typing_Test"

# Initialize Git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - SVKM Typing Test"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/SVKM_Typing_Test.git

# Push to GitHub
git push -u origin main
```

---

## Step 3: Deploy to Railway (FREE Hosting)

### Why Railway?
- ✅ **Completely FREE** - No credit card required
- ✅ **Automatic deployment** - Connects to GitHub
- ✅ **Shared database** - All students see same leaderboard
- ✅ **Real-time updates** - Leaderboard updates instantly

### Deploy Steps:
1. **Go to Railway**: [railway.app](https://railway.app)
2. **Sign up**: Use your GitHub account
3. **Create project**: Click "New Project" → "Deploy from GitHub repo"
4. **Select repository**: Choose `SVKM_Typing_Test`
5. **Deploy**: Railway automatically detects Python and deploys
6. **Get URL**: Your app will be live at `https://your-app-name.railway.app`

---

## Step 4: Test Your Deployment

### Test the Features:
1. **Visit your Railway URL**
2. **Login** with test data:
   - Name: Test Student
   - SAP ID: 12345678
   - College: DJ Sanghvi
   - Email: test@svkmmumbai.onmicrosoft.com
3. **Take a typing test** - Use all 3 attempts
4. **Check leaderboard** - Should show your results
5. **Test college filter** - Switch between colleges

### Test with Multiple Students:
1. **Open incognito/private browser**
2. **Login as different student**:
   - Name: Another Student
   - SAP ID: 87654321
   - College: SBMP
   - Email: another@sbmp.edu.in
3. **Take test** - Should see both students on leaderboard

---

## Step 5: Share with SVKM Students

### Send to Students:
```
🏆 SVKM Typing Challenge is Live!

Test your typing skills and compete with fellow SVKM students!

🌐 Website: https://your-app-name.railway.app

Features:
✅ 3 attempts to achieve your best WPM
✅ Real-time leaderboard across all colleges
✅ College-specific rankings (DJ Sanghvi, SBMP, MPSTME)
✅ Track your progress and compete with friends

Login with your SVKM email and start typing!
```

---

## 🔧 Troubleshooting

### If Git Commands Don't Work:
1. **Restart your computer** after installing Git
2. **Open new Command Prompt/PowerShell**
3. **Try again**

### If Railway Deployment Fails:
1. **Check logs** in Railway dashboard
2. **Make sure all files are pushed** to GitHub
3. **Verify requirements.txt** has all dependencies

### If Database Issues:
1. **Railway automatically creates** the SQLite database
2. **First user creates** the database structure
3. **No manual setup** required

---

## 🎉 You're Ready!

Once deployed, your SVKM Typing Test will have:
- ✅ **Shared leaderboards** - All students compete together
- ✅ **Real-time updates** - See scores instantly
- ✅ **College competition** - DJ Sanghvi vs SBMP vs MPSTME
- ✅ **3-attempt system** - Fair competition for everyone
- ✅ **Professional UI** - Modern, responsive design

**Your typing competition is ready to go live!** 🚀



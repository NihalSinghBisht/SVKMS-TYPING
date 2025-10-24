# 🚀 Deploy SVKM Typing Test with Shared Leaderboards

## Why You Need the Flask Version

For **shared leaderboards** where all students can see each other's scores, you need:
- ✅ **Centralized database** - All scores stored in one place
- ✅ **Real-time updates** - Leaderboard updates for everyone
- ✅ **User management** - Track who's taking tests
- ✅ **Shared competition** - Students compete against each other

## 🎯 Option 1: Railway (Recommended - FREE)

### Step 1: Prepare Your Code
Your code is already ready! I've added:
- `railway.json` - Railway configuration
- `Procfile` - Heroku compatibility
- Updated `app.py` - Production-ready settings

### Step 2: Deploy to Railway
1. **Sign up**: Go to [railway.app](https://railway.app) and sign up with GitHub
2. **Create project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select repository**: Choose your SVKM_Typing_Test repository
4. **Deploy**: Railway automatically detects Python and deploys
5. **Get URL**: Your app will be live at `https://your-app-name.railway.app`

### Step 3: Share with Students
- Send the Railway URL to all SVKM students
- Everyone will see the same leaderboard
- Real-time competition between colleges!

---

## 🎯 Option 2: Heroku (Also FREE)

### Step 1: Install Heroku CLI
Download from [devcenter.heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

### Step 2: Deploy
```bash
# Login to Heroku
heroku login

# Create app
heroku create svkm-typing-test

# Deploy
git add .
git commit -m "Initial commit"
git push heroku main

# Open app
heroku open
```

---

## 🎯 Option 3: Render (FREE Tier)

### Step 1: Connect GitHub
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"

### Step 2: Configure
- **Repository**: Select your SVKM_Typing_Test repo
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python app.py`
- **Plan**: Free

### Step 3: Deploy
- Click "Create Web Service"
- Wait for deployment
- Your app will be live!

---

## 🎯 Option 4: PythonAnywhere (FREE)

### Step 1: Sign Up
1. Go to [pythonanywhere.com](https://pythonanywhere.com)
2. Create free account
3. Go to "Web" tab

### Step 2: Upload Files
1. Upload all your files via Files tab
2. Install requirements: `pip3.10 install --user flask`
3. Create web app: Flask, Python 3.10

### Step 3: Configure
- **Source code**: `/home/yourusername/SVKM_Typing_Test`
- **WSGI file**: `/home/yourusername/SVKM_Typing_Test/app.py`
- **Working directory**: `/home/yourusername/SVKM_Typing_Test`

---

## 🏆 Recommended: Railway

**Why Railway is best:**
- ✅ **Completely FREE** - No credit card required
- ✅ **Automatic deployment** - Push to GitHub, auto-deploys
- ✅ **Built-in database** - SQLite works perfectly
- ✅ **Custom domains** - Add your own domain later
- ✅ **Easy scaling** - Upgrade if needed

## 📱 How Students Will Use It

1. **Visit your deployed URL** (e.g., `https://svkm-typing.railway.app`)
2. **Login** with their SVKM email and college
3. **Take tests** - 3 attempts each
4. **View leaderboard** - See everyone's scores in real-time
5. **Compete** - Students from all colleges compete together!

## 🔧 Database Features

Your Flask app includes:
- **Shared leaderboard** - All students see the same rankings
- **College filtering** - Filter by DJ Sanghvi, SBMP, MPSTME
- **Real-time updates** - Leaderboard updates immediately
- **User tracking** - See who's taking tests
- **Attempt management** - 3 attempts per student tracked

## 🚀 Quick Start

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Connect GitHub
   - Select your repo
   - Deploy!

3. **Share the URL** with SVKM students!

Your typing test competition is ready! 🎉



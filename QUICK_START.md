# Quick Start Guide - SVKM Typing Test

## 🚀 Getting Started

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation Steps

#### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 2. Run the Application
```bash
python app.py
```

#### 3. Open in Browser
Navigate to: `http://localhost:5000`

## 📋 First Time Setup

### Create Your Account
1. Click "Sign Up" on the login page
2. Enter your details:
   - Full Name
   - SAP ID
   - College (DJ Sanghvi, SBMP, or MPSTME)
   - SVKM Email (required for verification)
3. Click "Create Account"

### Login
1. Enter your SAP ID
2. Enter your SVKM Email
3. Click "Login"

## ⌨️ Taking a Typing Test

### Start a Test
1. Click "Start Test" button
2. Or use keyboard shortcut: `Ctrl + Space`

### During the Test
- Type the words displayed on screen
- Watch your WPM and accuracy in real-time
- Correct words appear in green
- Incorrect words appear in red

### After the Test
- View your results (WPM, Accuracy, Characters)
- Click "Retry" to take another test
- You have 3 attempts total

## 🎮 Features to Try

### Difficulty Levels
- **Easy**: Perfect for beginners
- **Medium**: Standard difficulty
- **Hard**: Challenge yourself!

### Test Duration
- **30 seconds**: Quick warm-up
- **60 seconds**: Standard test
- **120 seconds**: Extended test

### Keyboard Shortcuts
- `Ctrl + Space` - Start Test
- `Ctrl + R` - Reset Test
- `Esc` - Close Modal

### Theme Toggle
- Click the theme button to switch between dark and light modes

## 📊 Checking Your Progress

### Dashboard
- View your best WPM
- See all your test attempts
- Check your college rank
- Check your overall rank

### Leaderboard
- See how you rank against other students
- Filter by college
- View top performers

## 💡 Tips for Better Typing

1. **Focus on Accuracy**: Speed comes naturally with practice
2. **Proper Posture**: Sit upright with feet flat
3. **Finger Positioning**: Use home row (ASDF JKL;)
4. **Regular Practice**: Take tests consistently
5. **Take Breaks**: Avoid fatigue and strain

## 🎯 Goals to Achieve

- **Beginner**: 30-40 WPM
- **Intermediate**: 50-70 WPM
- **Advanced**: 80-100 WPM
- **Expert**: 100+ WPM

## 🔧 Troubleshooting

### Application Won't Start
```bash
# Make sure you're in the correct directory
cd svkm-typingtest

# Try running with explicit Python path
python3 app.py
```

### Port Already in Use
```bash
# The app uses port 5000 by default
# If it's in use, modify app.py to use a different port
```

### Database Issues
```bash
# Reset the database
python -c "from app import init_db; init_db()"
```

## 📱 Mobile Access

The application is fully responsive and works on:
- Smartphones
- Tablets
- Laptops
- Desktops

## 🌐 Deployment

For deploying to production, see:
- `DEPLOYMENT_GUIDE.md` - Railway deployment
- `GITHUB_DEPLOYMENT.md` - GitHub setup
- `DATABASE_AND_DEPLOYMENT.md` - Database configuration

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the main README.md
3. Check FEATURES_AND_IMPROVEMENTS.md for feature details

## 🎉 Have Fun!

Enjoy improving your typing skills and competing with fellow SVKM students!

---

**Happy Typing!** ⌨️✨


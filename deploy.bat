@echo off
echo 🚀 Deploying SVKM Typing Test to GitHub...
echo.

echo 📁 Adding files to Git...
git add .

echo 💾 Committing changes...
git commit -m "SVKM Typing Test - Ready for deployment with shared leaderboards"

echo 🚀 Pushing to GitHub...
git push origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo.
echo 🌐 Next steps:
echo 1. Go to https://railway.app
echo 2. Sign up with GitHub
echo 3. Create new project from your repository
echo 4. Deploy and get your live URL!
echo.
pause



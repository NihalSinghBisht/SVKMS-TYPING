# 🗄️ Database & Deployment Guide for SVKM Typing Test

## 📊 Database Storage - Where Your Data Lives

### **SQLite Database (Default)**
Your Flask app uses **SQLite** - a lightweight, file-based database that stores all data locally.

**Location:** `typing_test.db` (created automatically in your project folder)

### **What Data is Stored:**

#### 1. **Students Table** - User Information
```sql
- id (Primary Key) - Unique student ID
- name - Full name (e.g., "John Doe")
- sap_id - SAP ID (e.g., "12345678")
- college - College name ("DJ Sanghvi", "SBMP", "MPSTME")
- email - SVKM email address
- created_at - Registration timestamp
```

#### 2. **Test Results Table** - Typing Performance
```sql
- id (Primary Key) - Unique test result ID
- student_id - Links to students table
- wpm - Words per minute achieved
- accuracy - Typing accuracy percentage
- test_date - When the test was taken
```

### **Data Collection Summary:**
✅ **Student Name** - Collected during signup  
✅ **SAP ID** - Unique identifier for login  
✅ **College Name** - DJ Sanghvi, SBMP, or MPSTME  
✅ **SVKM Email** - For validation and login  
✅ **All Typing Data** - WPM, accuracy, timestamps  
✅ **Test History** - Complete record of all attempts  

---

## 🚀 Deployment Options for Shared Database

### **Option 1: Railway (Recommended - FREE)**

**Why Railway?**
- ✅ **Free hosting** - No credit card required
- ✅ **Shared database** - All students see same leaderboard
- ✅ **Automatic deployment** - Push to GitHub, auto-deploys
- ✅ **Persistent storage** - Data survives restarts

**Database:** SQLite file stored on Railway's servers

**Steps:**
1. Push code to GitHub
2. Connect Railway to your GitHub repo
3. Deploy automatically
4. All students access the same database!

### **Option 2: Heroku (FREE with limitations)**

**Database:** SQLite (free) or PostgreSQL (paid)

**Steps:**
1. Install Heroku CLI
2. `heroku create your-app-name`
3. `git push heroku main`
4. Database shared across all users

### **Option 3: PythonAnywhere (FREE)**

**Database:** SQLite stored on their servers

**Steps:**
1. Upload files to PythonAnywhere
2. Configure web app
3. Database automatically shared

---

## 🔄 How the System Works

### **Signup Flow:**
1. **New student** visits your deployed URL
2. **Clicks "Sign Up"** → Goes to signup page
3. **Enters details** → Name, SAP ID, College, Email
4. **System validates** → Checks SVKM email format
5. **Creates account** → Stores in database
6. **Auto-login** → Redirects to typing test

### **Login Flow:**
1. **Returning student** visits your deployed URL
2. **Clicks "Login"** → Goes to login page
3. **Enters credentials** → SAP ID + Email only
4. **System validates** → Checks against database
5. **Success** → Redirects to typing test

### **Typing Test Flow:**
1. **Unlimited attempts** → No 3-attempt limit
2. **Real-time tracking** → WPM and accuracy
3. **Auto-save results** → Stored in database
4. **Update leaderboard** → Visible to all students

### **Leaderboard Flow:**
1. **Shared rankings** → All students see same data
2. **College filtering** → Filter by DJ Sanghvi, SBMP, MPSTME
3. **Real-time updates** → Updates when new tests are taken
4. **Personal ranks** → Shows user's position

---

## 📱 Student Experience

### **First Time User:**
1. Visits your deployed URL
2. Sees signup page
3. Enters: Name, SAP ID, College, SVKM Email
4. Account created automatically
5. Can start typing tests immediately

### **Returning User:**
1. Visits your deployed URL
2. Sees login page
3. Enters: SAP ID + Email
4. Logs in instantly (no password needed)
5. Continues from where they left off

### **Competition Features:**
- **Unlimited practice** → Take as many tests as you want
- **Track progress** → See your best WPM and total tests
- **Compete globally** → See rankings across all colleges
- **College pride** → Filter leaderboard by your college
- **Real-time updates** → Leaderboard updates instantly

---

## 🛠️ Technical Details

### **Database Schema:**
```sql
-- Students table
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    sap_id TEXT UNIQUE NOT NULL,
    college TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test results table
CREATE TABLE test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    wpm INTEGER NOT NULL,
    accuracy INTEGER NOT NULL,
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id)
);
```

### **Data Security:**
- ✅ **No passwords** - Uses SAP ID + Email for authentication
- ✅ **Email validation** - Only SVKM emails allowed
- ✅ **SQL injection protection** - Parameterized queries
- ✅ **Session management** - Secure user sessions

### **Performance:**
- ✅ **Fast queries** - Optimized database structure
- ✅ **Real-time updates** - Instant leaderboard updates
- ✅ **Scalable** - Can handle hundreds of students
- ✅ **Reliable** - Data persists across restarts

---

## 🎯 Ready to Deploy!

Your SVKM Typing Test is now ready with:
- ✅ **Unlimited attempts** - No restrictions
- ✅ **Shared leaderboard** - All students compete together
- ✅ **Simple login** - SAP ID + Email only
- ✅ **Complete data collection** - Everything stored properly
- ✅ **Professional UI** - Modern, responsive design

**Next step:** Deploy to Railway and share the URL with SVKM students! 🚀


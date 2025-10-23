# SVKM Typing Test Website

A comprehensive typing test website designed exclusively for SVKM students with leaderboard functionality and attempt tracking.

## Features

### 🔐 Student Authentication
- **SVKM Email Validation**: Only students with valid SVKM email addresses can access the platform
- **College Selection**: Dropdown to select from DJ Sanghvi, SBMP, or MPSTME
- **Student Information**: Name and SAP ID collection for identification
- **Secure Login**: Session-based authentication system

### 🏆 Typing Test System
- **3 Attempts Limit**: Each student gets exactly 3 attempts to achieve their best score
- **Real-time Feedback**: Live WPM and accuracy tracking during typing
- **Best Score Tracking**: System automatically tracks and displays the best WPM achieved
- **Visual Feedback**: Color-coded typing accuracy (green for correct, red for errors)

### 📊 Leaderboard System
- **Overall Rankings**: Global leaderboard showing all students across colleges
- **College-Specific Rankings**: Filter leaderboard by individual colleges
- **Real-time Updates**: Leaderboard updates automatically after each test
- **Rank Display**: Shows current user's rank in both overall and college-specific leaderboards

### 📈 Student Dashboard
- **Personal Statistics**: View best WPM, total tests taken, and rankings
- **Test History**: Complete history of all typing test attempts
- **College Rank**: Personal ranking within the student's college
- **Overall Rank**: Personal ranking across all SVKM students

## Technical Features

### 🗄️ Database Management
- **SQLite Database**: Lightweight, file-based database for easy deployment
- **Student Data Storage**: Secure storage of student information and test results
- **Attempt Tracking**: Precise tracking of test attempts and scores

### 🎨 User Interface
- **Modern Dark Theme**: Clean, professional dark mode interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Intuitive Navigation**: Easy-to-use navigation between different sections

### 🔧 Backend Architecture
- **Flask Framework**: Python-based web framework for robust performance
- **RESTful API**: Clean API endpoints for frontend-backend communication
- **Session Management**: Secure session handling for user authentication

## Getting Started

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation
1. Clone or download the project files
2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   python app.py
   ```
4. Open your browser and navigate to `http://localhost:5000`

### Usage
1. **Login**: Enter your name, SAP ID, select your college, and provide your SVKM email
2. **Take Tests**: Use your 3 attempts to achieve the best possible WPM
3. **View Rankings**: Check the leaderboard to see your position
4. **Track Progress**: Use the dashboard to monitor your performance

## Database Schema

### Students Table
- `id`: Primary key
- `name`: Student's full name
- `sap_id`: Unique SAP ID
- `college`: College name (DJ Sanghvi, SBMP, or MPSTME)
- `email`: SVKM email address
- `created_at`: Registration timestamp

### Test Results Table
- `id`: Primary key
- `student_id`: Foreign key to students table
- `attempt_number`: Attempt number (1, 2, or 3)
- `wpm`: Words per minute achieved
- `accuracy`: Typing accuracy percentage
- `test_date`: Test completion timestamp

## Security Features

- **Email Validation**: Strict validation of SVKM email domains
- **Session Security**: Secure session management
- **Input Validation**: All user inputs are validated and sanitized
- **SQL Injection Protection**: Parameterized queries prevent SQL injection

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Support

For technical support or questions, please contact the development team.

---

**Note**: This project is not officially affiliated with SVKM and is built for educational and entertainment purposes.




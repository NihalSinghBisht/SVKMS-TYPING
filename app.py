from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import sqlite3
import hashlib
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"

# Database initialization
def init_db():
    conn = sqlite3.connect('typing_test.db')
    cursor = conn.cursor()
    
    # Create students table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            sap_id TEXT UNIQUE NOT NULL,
            college TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create test_results table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS test_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            attempt_number INTEGER NOT NULL,
            wpm INTEGER NOT NULL,
            accuracy INTEGER NOT NULL,
            test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES students (id)
        )
    ''')
    
    conn.commit()
    conn.close()

def get_db_connection():
    conn = sqlite3.connect('typing_test.db')
    conn.row_factory = sqlite3.Row
    return conn

def validate_svkm_email(email):
    """Validate SVKM email format"""
    valid_domains = [
        '@svkmmumbai.onmicrosoft.com',
        '@djsce.ac.in',
        '@sbmp.edu.in',
        '@mpstme.ac.in',
        '@nmims.edu',
        '@mithibai.ac.in'
    ]
    return any(email.lower().endswith(domain) for domain in valid_domains)

@app.route("/", methods=["GET"])
def home():
    if not session.get("user_id"):
        return redirect(url_for("signup"))
    
    conn = get_db_connection()
    student = conn.execute(
        'SELECT * FROM students WHERE id = ?', (session['user_id'],)
    ).fetchone()
    conn.close()
    
    return render_template("index.html", student=student)

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        sap_id = request.form.get("sap_id", "").strip()
        college = request.form.get("college", "").strip()
        email = request.form.get("email", "").strip()
        
        # Validation
        if not all([name, sap_id, college, email]):
            return render_template("signup.html", error="All fields are required.")
        
        if not validate_svkm_email(email):
            return render_template("signup.html", error="Please enter a valid SVKM email address.")
        
        conn = get_db_connection()
        
        # Check if student already exists
        existing_student = conn.execute(
            'SELECT * FROM students WHERE email = ? OR sap_id = ?', 
            (email, sap_id)
        ).fetchone()
        
        if existing_student:
            conn.close()
            return render_template("signup.html", error="Student already exists. Please login instead.")
        
        # Create new student
        cursor = conn.execute(
            'INSERT INTO students (name, sap_id, college, email) VALUES (?, ?, ?, ?)',
            (name, sap_id, college, email)
        )
        student_id = cursor.lastrowid
        
        conn.commit()
        conn.close()
        
        session["user_id"] = student_id
        session["user_name"] = name
        session["user_college"] = college
        session["user_sap_id"] = sap_id
        return redirect(url_for("home"))
    
    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        sap_id = request.form.get("sap_id", "").strip()
        email = request.form.get("email", "").strip()
        
        # Validation
        if not all([sap_id, email]):
            return render_template("login.html", error="SAP ID and email are required.")
        
        if not validate_svkm_email(email):
            return render_template("login.html", error="Please enter a valid SVKM email address.")
        
        conn = get_db_connection()
        
        # Check if student exists
        student = conn.execute(
            'SELECT * FROM students WHERE sap_id = ? AND email = ?', 
            (sap_id, email)
        ).fetchone()
        
        if not student:
            conn.close()
            return render_template("login.html", error="Student not found. Please signup first.")
        
        conn.close()
        
        session["user_id"] = student['id']
        session["user_name"] = student['name']
        session["user_college"] = student['college']
        session["user_sap_id"] = student['sap_id']
        return redirect(url_for("home"))
    
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/leaderboard")
def leaderboard():
    if not session.get("user_id"):
        return redirect(url_for("login"))
    
    college_filter = request.args.get('college', '')
    
    conn = get_db_connection()
    
    # Get overall leaderboard
    if college_filter:
        query = '''
            SELECT s.name, s.college, s.sap_id, 
                   MAX(tr.wpm) as best_wpm,
                   tr.accuracy,
                   tr.test_date
            FROM students s
            JOIN test_results tr ON s.id = tr.student_id
            WHERE s.college = ?
            GROUP BY s.id
            ORDER BY best_wpm DESC, tr.test_date ASC
        '''
        params = (college_filter,)
    else:
        query = '''
            SELECT s.name, s.college, s.sap_id, 
                   MAX(tr.wpm) as best_wpm,
                   tr.accuracy,
                   tr.test_date
            FROM students s
            JOIN test_results tr ON s.id = tr.student_id
            GROUP BY s.id
            ORDER BY best_wpm DESC, tr.test_date ASC
        '''
        params = ()
    
    leaderboard_data = conn.execute(query, params).fetchall()
    
    # Get current user's rank
    current_user_rank = None
    for i, student in enumerate(leaderboard_data):
        if student['sap_id'] == session.get('user_sap_id'):
            current_user_rank = i + 1
            break
    
    # Get colleges for filter dropdown
    colleges = conn.execute('SELECT DISTINCT college FROM students ORDER BY college').fetchall()
    
    conn.close()
    
    return render_template("leaderboard.html", 
                         leaderboard=leaderboard_data, 
                         colleges=colleges,
                         current_college=college_filter,
                         user_rank=current_user_rank)

@app.route("/dashboard")
def dashboard():
    if not session.get("user_id"):
        return redirect(url_for("login"))
    
    conn = get_db_connection()
    
    # Get student info
    student = conn.execute(
        'SELECT * FROM students WHERE id = ?', (session['user_id'],)
    ).fetchone()
    
    # Get test results
    test_results = conn.execute(
        'SELECT * FROM test_results WHERE student_id = ? ORDER BY test_date DESC',
        (session['user_id'],)
    ).fetchall()
    
    # Get best WPM
    best_result = conn.execute(
        'SELECT MAX(wpm) as best_wpm FROM test_results WHERE student_id = ?',
        (session['user_id'],)
    ).fetchone()
    
    # Get college rank
    college_rank_query = '''
        SELECT COUNT(*) + 1 as rank
        FROM (
            SELECT s.id, MAX(tr.wpm) as best_wpm
            FROM students s
            JOIN test_results tr ON s.id = tr.student_id
            WHERE s.college = ?
            GROUP BY s.id
            HAVING MAX(tr.wpm) > (
                SELECT MAX(tr2.wpm) 
                FROM test_results tr2 
                WHERE tr2.student_id = ?
            )
        )
    '''
    college_rank = conn.execute(college_rank_query, (student['college'], session['user_id'])).fetchone()
    
    # Get overall rank
    overall_rank_query = '''
        SELECT COUNT(*) + 1 as rank
        FROM (
            SELECT s.id, MAX(tr.wpm) as best_wpm
            FROM students s
            JOIN test_results tr ON s.id = tr.student_id
            GROUP BY s.id
            HAVING MAX(tr.wpm) > (
                SELECT MAX(tr2.wpm) 
                FROM test_results tr2 
                WHERE tr2.student_id = ?
            )
        )
    '''
    overall_rank = conn.execute(overall_rank_query, (session['user_id'],)).fetchone()
    
    conn.close()
    
    return render_template("dashboard.html", 
                         student=student,
                         test_results=test_results,
                         best_wpm=best_result['best_wpm'] or 0,
                         college_rank=college_rank['rank'] if college_rank else 'N/A',
                         overall_rank=overall_rank['rank'] if overall_rank else 'N/A')

@app.route("/submit_test", methods=["POST"])
def submit_test():
    if not session.get("user_id"):
        return jsonify({"error": "Not logged in"}), 401
    
    data = request.get_json()
    wpm = data.get('wpm', 0)
    accuracy = data.get('accuracy', 0)
    
    conn = get_db_connection()
    
    # Get next attempt number for this student
    last_attempt = conn.execute(
        'SELECT MAX(attempt_number) as max_attempt FROM test_results WHERE student_id = ?',
        (session['user_id'],)
    ).fetchone()
    
    next_attempt = (last_attempt['max_attempt'] or 0) + 1
    
    # Insert test result
    conn.execute(
        'INSERT INTO test_results (student_id, attempt_number, wpm, accuracy) VALUES (?, ?, ?, ?)',
        (session['user_id'], next_attempt, wpm, accuracy)
    )
    
    conn.commit()
    conn.close()
    
    return jsonify({"success": True, "attempt_number": next_attempt})

@app.route("/get_user_stats", methods=["GET"])
def get_user_stats():
    if not session.get("user_id"):
        return jsonify({"error": "Not logged in"}), 401
    
    conn = get_db_connection()
    
    # Get best WPM
    best_result = conn.execute(
        'SELECT MAX(wpm) as best_wpm FROM test_results WHERE student_id = ?',
        (session['user_id'],)
    ).fetchone()
    
    # Get total tests
    total_tests = conn.execute(
        'SELECT COUNT(*) as count FROM test_results WHERE student_id = ?',
        (session['user_id'],)
    ).fetchone()
    
    conn.close()
    
    return jsonify({
        "success": True,
        "best_wpm": best_result['best_wpm'] or 0,
        "total_tests": total_tests['count']
    })

@app.route("/get_college_rank", methods=["GET"])
def get_college_rank():
    if not session.get("user_id"):
        return jsonify({"error": "Not logged in"}), 401
    
    conn = get_db_connection()
    
    # Get student's college
    student = conn.execute(
        'SELECT college FROM students WHERE id = ?', (session['user_id'],)
    ).fetchone()
    
    if not student:
        conn.close()
        return jsonify({"error": "Student not found"}), 404
    
    # Get college rank
    college_rank_query = '''
        SELECT COUNT(*) + 1 as rank
        FROM (
            SELECT s.id, MAX(tr.wpm) as best_wpm
            FROM students s
            JOIN test_results tr ON s.id = tr.student_id
            WHERE s.college = ?
            GROUP BY s.id
            HAVING MAX(tr.wpm) > (
                SELECT MAX(tr2.wpm) 
                FROM test_results tr2 
                WHERE tr2.student_id = ?
            )
        )
    '''
    college_rank = conn.execute(college_rank_query, (student['college'], session['user_id'])).fetchone()
    
    conn.close()
    
    return jsonify({
        "success": True,
        "rank": college_rank['rank'] if college_rank else 1
    })

@app.route("/get_top_players", methods=["GET"])
def get_top_players():
    conn = get_db_connection()
    
    # Get top 5 players
    query = '''
        SELECT s.name, MAX(tr.wpm) as best_wpm
        FROM students s
        JOIN test_results tr ON s.id = tr.student_id
        GROUP BY s.id
        ORDER BY best_wpm DESC
        LIMIT 5
    '''
    
    top_players = conn.execute(query).fetchall()
    conn.close()
    
    return jsonify({
        "success": True,
        "players": [{"name": player['name']} for player in top_players]
    })

@app.route("/reset_database", methods=["POST"])
def reset_database():
    """Reset database - for development only"""
    try:
        if os.path.exists('typing_test.db'):
            os.remove('typing_test.db')
        init_db()
        return jsonify({"success": True, "message": "Database reset successfully"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == "__main__":
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
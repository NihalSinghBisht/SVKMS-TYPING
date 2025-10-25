from flask import Flask, render_template, request, redirect, url_for, jsonify, session
import sqlite3
import secrets
from database import initialize_database

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)  # Generate a secure secret key

# Initialize database on startup
initialize_database()

# Database connection helper
def get_db_connection():
    conn = sqlite3.connect('svkm_typing.db')
    conn.row_factory = sqlite3.Row
    return conn

# Routes
@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def handle_login():
    action = request.form.get('action')
    email = request.form.get('email')
    sap_id = request.form.get('sap-id')

    if not email or not sap_id:
        return "Email and SAP ID are required.", 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        if action == 'signup':
            name = request.form.get('name')
            college = request.form.get('college')
            
            if not name or not college:
                return "Name and College are required for signup.", 400
            
            # Check if user already exists
            cursor.execute('SELECT * FROM users WHERE email = ? OR sap_id = ?', (email, sap_id))
            existing_user = cursor.fetchone()
            
            if existing_user:
                return "User already exists. Please login instead.", 400
            
            # Insert new user
            cursor.execute('''INSERT INTO users (name, email, sap_id, college) 
                            VALUES (?, ?, ?, ?)''', (name, email, sap_id, college))
            conn.commit()
            
        elif action == 'login':
            # Verify user credentials
            cursor.execute('SELECT * FROM users WHERE email = ? AND sap_id = ?', (email, sap_id))
            user = cursor.fetchone()
            
            if not user:
                return "Invalid credentials. Please try again.", 401
        
        else:
            return "Invalid action specified.", 400

    except sqlite3.Error as e:
        return f"Database error: {str(e)}", 500
    finally:
        conn.close()

    # If we get here, either login or signup was successful
    # Store user info in session
    session['user'] = {
        'email': email,
        'sap_id': sap_id
    }
    return redirect(url_for('main'))

@app.route('/main')
def main():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('main.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

@app.route('/submit_result', methods=['POST'])
def submit_result():
    data = request.json
    email = data.get('email')
    wpm = data.get('wpm')
    accuracy = data.get('accuracy')
    raw_wpm = data.get('raw_wpm')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Get user_id from email
        cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        if not user:
            return jsonify({'success': False, 'error': 'User not found'})

        # Insert test result
        cursor.execute('''
            INSERT INTO test_results (user_id, wpm, accuracy, raw_wpm)
            VALUES (?, ?, ?, ?)
        ''', (user['id'], wpm, accuracy, raw_wpm))
        conn.commit()
        return jsonify({'success': True})

    except sqlite3.Error as e:
        return jsonify({'success': False, 'error': str(e)})
    finally:
        conn.close()

@app.route('/leaderboard')
def leaderboard():
    if 'user' not in session:
        return redirect(url_for('login'))
        
    college = request.args.get('college', 'all')
    rankings = []
    conn = None
    cursor = None
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # First check if there are any users
        cursor.execute('SELECT COUNT(*) FROM users')
        user_count = cursor.fetchone()[0]

        if user_count == 0:
            return render_template('leaderboard.html', rankings=[], selected_college=college)

        if college != 'all':
            # Get college-specific leaderboard
            cursor.execute('''
                SELECT 
                    u.name,
                    u.college,
                    COALESCE(MAX(t.wpm), 0) as best_wpm,
                    COALESCE(AVG(t.accuracy), 0) as avg_accuracy,
                    COUNT(t.id) as tests_taken
                FROM users u
                LEFT JOIN test_results t ON u.id = t.user_id
                WHERE u.college = ?
                GROUP BY u.id, u.name, u.college
                ORDER BY best_wpm DESC
            ''', (college,))
        else:
            # Get global leaderboard
            cursor.execute('''
                SELECT 
                    u.name,
                    u.college,
                    COALESCE(MAX(t.wpm), 0) as best_wpm,
                    COALESCE(AVG(t.accuracy), 0) as avg_accuracy,
                    COUNT(t.id) as tests_taken
                FROM users u
                LEFT JOIN test_results t ON u.id = t.user_id
                GROUP BY u.id, u.name, u.college
                ORDER BY best_wpm DESC
            ''')
        
        rankings = cursor.fetchall()
        return render_template('leaderboard.html', rankings=rankings, selected_college=college)
    
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return render_template('leaderboard.html', rankings=[], selected_college=college)
    
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/about')
def about():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('about.html')

@app.route('/contact')
def contact():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)
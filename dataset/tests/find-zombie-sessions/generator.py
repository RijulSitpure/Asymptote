import sqlite3

def generate_test():
    conn = sqlite3.connect(':memory:')
    cur = conn.cursor()
    cur.execute('''
    CREATE TABLE Sessions (
        session_id INT PRIMARY KEY,
        user_id INT,
        start_time DATETIME,
        end_time DATETIME,
        activity_count INT
    );
    ''')
    
    data = [
        # Session 1: 0 activity -> ZOMBIE
        (1, 101, '2026-01-01 10:00:00', '2026-01-01 11:00:00', 0),
        # Session 2: 26 hours duration -> ZOMBIE
        (2, 102, '2026-01-01 10:00:00', '2026-01-02 12:00:00', 10),
        # Session 3: normal active session -> ACTIVE
        (3, 103, '2026-01-01 10:00:00', '2026-01-01 12:00:00', 5)
    ]
    cur.executemany("INSERT INTO Sessions VALUES (?, ?, ?, ?, ?);", data)
    conn.commit()
    
    cur.execute('''
    SELECT 
        session_id,
        user_id,
        start_time,
        end_time,
        activity_count
    FROM Sessions
    WHERE activity_count = 0
       OR (julianday(end_time) - julianday(start_time)) * 24 >= 24
    ORDER BY session_id ASC;
    ''')
    rows = cur.fetchall()
    assert len(rows) == 2
    assert rows[0][0] == 1
    assert rows[1][0] == 2
    print("Database test passed for 3673.")

if __name__ == '__main__':
    generate_test()

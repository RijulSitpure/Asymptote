import sqlite3
import pandas as pd

def generate_cases():
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE Customers (customer_id INT PRIMARY KEY, name VARCHAR(50));")
    cur.execute("CREATE TABLE Subscriptions (subscription_id INT PRIMARY KEY, customer_id INT, start_date DATE, end_date DATE, auto_renew INT);")
    
    cur.executemany("INSERT INTO Customers VALUES (?, ?);", [
        (1, "David"), (2, "Emma"), (3, "Frank")
    ])
    cur.executemany("INSERT INTO Subscriptions VALUES (?, ?, ?, ?, ?);", [
        (10, 1, "2025-11-15", "2026-11-15", 0),
        (20, 2, "2025-11-20", "2026-11-20", 1),
        (30, 3, "2025-12-05", "2026-12-05", 0)
    ])
    conn.commit()
    
    q = """
    SELECT c.customer_id, c.name, s.end_date
    FROM Customers c
    JOIN Subscriptions s ON c.customer_id = s.customer_id
    WHERE s.auto_renew = 0
      AND s.end_date BETWEEN '2026-11-01' AND '2026-11-30'
    ORDER BY c.customer_id ASC;
    """
    df = pd.read_sql_query(q, conn)
    conn.close()
    assert len(df) == 1
    assert df.iloc[0]['name'] == 'David'
    print("Database test passed for 3716.")

if __name__ == "__main__":
    generate_cases()
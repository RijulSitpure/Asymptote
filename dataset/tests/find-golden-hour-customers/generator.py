import sqlite3
import pandas as pd

def generate_cases():
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE Customers (customer_id INT PRIMARY KEY, name VARCHAR(50));")
    cur.execute("CREATE TABLE Orders (order_id INT PRIMARY KEY, customer_id INT, order_timestamp DATETIME, amount DECIMAL(10,2));")
    
    cur.executemany("INSERT INTO Customers VALUES (?, ?);", [
        (1, "Alice"), (2, "Bob"), (3, "Charlie")
    ])
    cur.executemany("INSERT INTO Orders VALUES (?, ?, ?, ?);", [
        (101, 1, "2026-11-01 18:15:00", 60.00),
        (102, 1, "2026-11-01 18:45:00", 50.00),
        (103, 2, "2026-11-01 18:30:00", 40.00),
        (104, 3, "2026-11-01 19:10:00", 200.00)
    ])
    conn.commit()
    
    # Query in sqlite (strftime hour)
    q = """
    SELECT c.customer_id, c.name, SUM(o.amount) as total_golden_spent
    FROM Customers c
    JOIN Orders o ON c.customer_id = o.customer_id
    WHERE strftime('%H', o.order_timestamp) = '18'
    GROUP BY c.customer_id, c.name
    HAVING SUM(o.amount) >= 100
    ORDER BY c.customer_id ASC;
    """
    df = pd.read_sql_query(q, conn)
    conn.close()
    assert len(df) == 1
    assert df.iloc[0]['name'] == 'Alice'
    print("Database test passed for 3705.")

if __name__ == "__main__":
    generate_cases()
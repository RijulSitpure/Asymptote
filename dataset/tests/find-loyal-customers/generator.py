import sqlite3

def generate_test():
    conn = sqlite3.connect(':memory:')
    cur = conn.cursor()
    cur.execute('''
    CREATE TABLE Customers (
        customer_id INT PRIMARY KEY,
        customer_name VARCHAR(100),
        join_date DATE
    );
    ''')
    cur.execute('''
    CREATE TABLE Purchases (
        purchase_id INT PRIMARY KEY,
        customer_id INT,
        purchase_date DATE,
        amount DECIMAL(10, 2)
    );
    ''')
    
    customers_data = [
        (1, 'Alice', '2026-01-01'),
        (2, 'Bob', '2026-01-01'),
        (3, 'Charlie', '2026-01-01')
    ]
    cur.executemany("INSERT INTO Customers VALUES (?, ?, ?);", customers_data)
    
    purchases_data = [
        # Alice: 3 distinct months, 600 total -> LOYAL
        (101, 1, '2026-01-15', 200.0),
        (102, 1, '2026-02-15', 200.0),
        (103, 1, '2026-03-15', 200.0),
        # Bob: 3 distinct months, 400 total -> NOT enough spent
        (201, 2, '2026-01-10', 100.0),
        (202, 2, '2026-02-10', 100.0),
        (203, 2, '2026-03-10', 200.0),
        # Charlie: 2 distinct months, 1000 total -> NOT enough distinct months
        (301, 3, '2026-01-05', 500.0),
        (302, 3, '2026-02-05', 500.0)
    ]
    cur.executemany("INSERT INTO Purchases VALUES (?, ?, ?, ?);", purchases_data)
    conn.commit()
    
    cur.execute('''
    SELECT 
        c.customer_id,
        c.customer_name,
        COUNT(DISTINCT strftime('%Y-%m', p.purchase_date)) AS active_months,
        SUM(p.amount) AS total_spent
    FROM Customers c
    JOIN Purchases p ON c.customer_id = p.customer_id
    GROUP BY c.customer_id, c.customer_name
    HAVING COUNT(DISTINCT strftime('%Y-%m', p.purchase_date)) >= 3
       AND SUM(p.amount) >= 500.00
    ORDER BY c.customer_id ASC;
    ''')
    rows = cur.fetchall()
    assert len(rows) == 1
    assert rows[0][0] == 1
    assert rows[0][1] == 'Alice'
    assert rows[0][2] == 3
    assert rows[0][3] == 600.0
    print("Database test passed for 3657.")

if __name__ == '__main__':
    generate_test()

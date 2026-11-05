import sqlite3
import json

def generate_test():
    conn = sqlite3.connect(':memory:')
    cur = conn.cursor()
    cur.execute('''
    CREATE TABLE Books (
        book_id INT PRIMARY KEY,
        title VARCHAR(100),
        author VARCHAR(100),
        genre VARCHAR(50)
    );
    ''')
    cur.execute('''
    CREATE TABLE Reviews (
        review_id INT PRIMARY KEY,
        book_id INT,
        rating INT,
        review_date DATE
    );
    ''')
    
    books_data = [
        (1, 'Book Alpha', 'Author A', 'Fiction'),
        (2, 'Book Beta', 'Author B', 'Sci-Fi'),
        (3, 'Book Gamma', 'Author C', 'Non-Fiction')
    ]
    cur.executemany("INSERT INTO Books VALUES (?, ?, ?, ?);", books_data)
    
    reviews_data = [
        # Book 1: 3 positive, 2 negative -> 60% pos, 40% neg (total 5) -> POLARIZED
        (101, 1, 5, '2026-01-01'),
        (102, 1, 5, '2026-01-02'),
        (103, 1, 4, '2026-01-03'),
        (104, 1, 1, '2026-01-04'),
        (105, 1, 2, '2026-01-05'),
        # Book 2: 5 reviews, all 3s -> 0% pos, 0% neg -> NOT polarized
        (201, 2, 3, '2026-01-01'),
        (202, 2, 3, '2026-01-02'),
        (203, 2, 3, '2026-01-03'),
        (204, 2, 3, '2026-01-04'),
        (205, 2, 3, '2026-01-05'),
        # Book 3: only 3 reviews -> NOT enough reviews
        (301, 3, 5, '2026-01-01'),
        (302, 3, 1, '2026-01-02'),
        (303, 3, 5, '2026-01-03')
    ]
    cur.executemany("INSERT INTO Reviews VALUES (?, ?, ?, ?);", reviews_data)
    conn.commit()
    
    cur.execute('''
    SELECT 
        b.book_id,
        b.title,
        b.author,
        b.genre,
        COUNT(r.review_id) AS total_reviews,
        ROUND(SUM(CASE WHEN r.rating >= 4 THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(r.review_id), 2) AS positive_pct,
        ROUND(SUM(CASE WHEN r.rating <= 2 THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(r.review_id), 2) AS negative_pct
    FROM Books b
    JOIN Reviews r ON b.book_id = r.book_id
    GROUP BY b.book_id, b.title, b.author, b.genre
    HAVING COUNT(r.review_id) >= 5
       AND positive_pct >= 30.00
       AND negative_pct >= 30.00
    ORDER BY b.book_id ASC;
    ''')
    rows = cur.fetchall()
    assert len(rows) == 1
    assert rows[0][0] == 1
    assert rows[0][4] == 5
    assert rows[0][5] == 60.0
    assert rows[0][6] == 40.0
    print("Database test passed for 3642.")

if __name__ == '__main__':
    generate_test()

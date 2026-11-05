import sqlite3
import pandas as pd

def generate_cases():
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE UserTokens (user_id INT, token_usage INT, usage_date DATE);")
    cur.executemany("INSERT INTO UserTokens VALUES (?, ?, ?);", [
        (1, 6000, "2026-11-01"),
        (1, 5000, "2026-11-02"),
        (2, 4000, "2026-11-01"),
        (3, 12000, "2026-11-01")
    ])
    conn.commit()

    q = """
    SELECT 
        user_id,
        SUM(token_usage) AS total_usage
    FROM UserTokens
    GROUP BY user_id
    HAVING SUM(token_usage) > 10000
    ORDER BY user_id ASC;
    """
    df = pd.read_sql_query(q, conn)
    conn.close()
    assert len(df) == 2
    assert list(df['user_id']) == [1, 3]
    print("Database test passed for 3793.")

if __name__ == "__main__":
    generate_cases()

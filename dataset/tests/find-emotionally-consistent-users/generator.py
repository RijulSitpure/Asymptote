import sqlite3
import pandas as pd

def generate_cases():
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE UserPosts (post_id INT, user_id INT, sentiment VARCHAR(20), post_date DATE);")
    cur.executemany("INSERT INTO UserPosts VALUES (?, ?, ?, ?);", [
        (1, 101, "positive", "2026-11-01"),
        (2, 101, "positive", "2026-11-02"),
        (3, 101, "positive", "2026-11-03"),
        (4, 102, "positive", "2026-11-01"),
        (5, 102, "negative", "2026-11-02"),
        (6, 102, "positive", "2026-11-03"),
        (7, 103, "neutral", "2026-11-01"),
        (8, 103, "neutral", "2026-11-02")
    ])
    conn.commit()

    q = """
    SELECT 
        user_id,
        MIN(sentiment) AS sentiment,
        COUNT(post_id) AS post_count
    FROM UserPosts
    GROUP BY user_id
    HAVING COUNT(post_id) >= 3 
       AND COUNT(DISTINCT sentiment) = 1
    ORDER BY user_id ASC;
    """
    df = pd.read_sql_query(q, conn)
    conn.close()
    assert len(df) == 1
    assert df.iloc[0]['user_id'] == 101
    assert df.iloc[0]['sentiment'] == 'positive'
    assert df.iloc[0]['post_count'] == 3
    print("Database test passed for 3808.")

if __name__ == "__main__":
    generate_cases()

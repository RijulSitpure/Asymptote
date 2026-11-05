import sqlite3
import pandas as pd

def generate_cases():
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE Enrollments (student_id INT, course_id INT);")
    cur.executemany("INSERT INTO Enrollments VALUES (?, ?);", [
        (1, 101), (1, 102), (1, 103),
        (2, 101), (2, 102),
        (3, 101), (3, 103),
        (4, 101), (4, 102)
    ])
    conn.commit()

    q = """
    WITH PairCounts AS (
        SELECT 
            e1.course_id AS course1_id,
            e2.course_id AS course2_id,
            COUNT(DISTINCT e1.student_id) AS pair_count
        FROM Enrollments e1
        JOIN Enrollments e2 
          ON e1.student_id = e2.student_id 
         AND e1.course_id < e2.course_id
        GROUP BY e1.course_id, e2.course_id
    ),
    Ranked AS (
        SELECT 
            course1_id,
            course2_id,
            pair_count,
            DENSE_RANK() OVER (ORDER BY pair_count DESC) AS rnk
        FROM PairCounts
    )
    SELECT 
        course1_id,
        course2_id,
        pair_count
    FROM Ranked
    WHERE rnk = 1
    ORDER BY course1_id ASC, course2_id ASC;
    """
    df = pd.read_sql_query(q, conn)
    conn.close()
    assert len(df) == 1
    assert df.iloc[0]['course1_id'] == 101
    assert df.iloc[0]['course2_id'] == 102
    assert df.iloc[0]['pair_count'] == 3
    print("Database test passed for 3764.")

if __name__ == "__main__":
    generate_cases()

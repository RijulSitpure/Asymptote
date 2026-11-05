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

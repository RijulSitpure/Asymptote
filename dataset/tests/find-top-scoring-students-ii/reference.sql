WITH MandatoryMajors AS (
    SELECT major, COUNT(course_id) AS mandatory_count
    FROM courses
    WHERE mandatory = 'Yes'
    GROUP BY major
),
StudentStats AS (
    SELECT 
        s.student_id,
        s.major,
        SUM(CASE WHEN s.major = c.major AND c.mandatory = 'Yes' AND e.grade = 'A' THEN 1 ELSE 0 END) AS mandatory_a_count,
        SUM(CASE WHEN s.major = c.major AND c.mandatory = 'No' AND e.grade IN ('A', 'B') THEN 1 ELSE 0 END) AS elective_count,
        ROUND(SUM(e.gpa * c.credits) / SUM(c.credits), 2) AS avg_gpa
    FROM students s
    JOIN enrollments e ON s.student_id = e.student_id
    JOIN courses c ON e.course_id = c.course_id
    GROUP BY s.student_id, s.major
)
SELECT ss.student_id
FROM StudentStats ss
JOIN MandatoryMajors mm 
  ON ss.major = mm.major 
 AND ss.mandatory_a_count = mm.mandatory_count
WHERE ss.elective_count >= 2
  AND ss.avg_gpa >= 2.5
ORDER BY ss.student_id ASC;

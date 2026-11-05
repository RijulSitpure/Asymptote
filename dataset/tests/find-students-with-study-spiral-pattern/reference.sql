WITH student_stats AS (
    SELECT 
        s.student_id,
        st.student_name,
        st.major,
        COUNT(DISTINCT s.subject) AS distinct_subjects,
        SUM(s.hours_spent) AS total_study_hours
    FROM study_sessions s
    JOIN students st ON s.student_id = st.student_id
    GROUP BY s.student_id, st.student_name, st.major
)
SELECT 
    student_id,
    student_name,
    major,
    ROUND(total_study_hours, 2) AS total_study_hours
FROM student_stats
WHERE distinct_subjects >= 3
ORDER BY total_study_hours DESC, student_id ASC;

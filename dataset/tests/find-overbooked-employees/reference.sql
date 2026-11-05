WITH overlapping_pairs AS (
    SELECT 
        m1.employee_id,
        m1.meeting_date,
        COUNT(DISTINCT m1.meeting_id) AS overlapping_meetings_count
    FROM meetings m1
    JOIN meetings m2 ON m1.employee_id = m2.employee_id 
                    AND m1.meeting_date = m2.meeting_date 
                    AND m1.meeting_id != m2.meeting_id
                    AND m1.start_time < m2.end_time 
                    AND m2.start_time < m1.end_time
    GROUP BY m1.employee_id, m1.meeting_date
)
SELECT 
    e.employee_id,
    e.employee_name,
    e.department,
    o.meeting_date,
    o.overlapping_meetings_count
FROM overlapping_pairs o
JOIN employees e ON o.employee_id = e.employee_id
ORDER BY o.meeting_date ASC, e.employee_id ASC;

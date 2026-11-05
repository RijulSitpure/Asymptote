WITH TimePoints AS (
    SELECT DISTINCT employee_id, start_time AS st FROM Tasks
    UNION DISTINCT
    SELECT DISTINCT employee_id, end_time AS st FROM Tasks
),
Segments AS (
    SELECT 
        employee_id,
        st AS start_time,
        LEAD(st) OVER (PARTITION BY employee_id ORDER BY st) AS end_time
    FROM TimePoints
),
SegmentStats AS (
    SELECT 
        s.employee_id,
        s.start_time,
        s.end_time,
        COUNT(t.task_id) AS concurrent_count
    FROM Segments s
    JOIN Tasks t
      ON s.employee_id = t.employee_id
     AND s.start_time >= t.start_time
     AND s.end_time <= t.end_time
    WHERE s.end_time IS NOT NULL
    GROUP BY s.employee_id, s.start_time, s.end_time
)
SELECT 
    employee_id,
    FLOOR(SUM(TIMESTAMPDIFF(SECOND, start_time, end_time)) / 3600) AS total_task_hours,
    MAX(concurrent_count) AS max_concurrent_tasks
FROM SegmentStats
GROUP BY employee_id
ORDER BY employee_id;

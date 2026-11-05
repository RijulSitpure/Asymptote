WITH EmployeeTimes AS (
    SELECT DISTINCT employee_id, start_time AS event_time FROM EmployeeShifts
    UNION DISTINCT
    SELECT DISTINCT employee_id, end_time AS event_time FROM EmployeeShifts
),
Segments AS (
    SELECT 
        employee_id, 
        event_time AS start_time, 
        LEAD(event_time) OVER(PARTITION BY employee_id ORDER BY event_time) AS end_time 
    FROM EmployeeTimes
),
SegmentsCount AS (
    SELECT 
        s.employee_id,
        s.start_time,
        s.end_time,
        COUNT(*) AS concurrent_count
    FROM Segments s
    JOIN EmployeeShifts es ON s.employee_id = es.employee_id
    WHERE s.start_time >= es.start_time 
      AND s.end_time <= es.end_time
    GROUP BY s.employee_id, s.start_time, s.end_time
)
SELECT 
    employee_id,
    MAX(concurrent_count) AS max_overlapping_shifts,
    COALESCE(SUM(
        FLOOR(concurrent_count * (concurrent_count - 1) / 2) * TIMESTAMPDIFF(MINUTE, start_time, end_time)
    ), 0) AS total_overlap_duration
FROM SegmentsCount
GROUP BY employee_id
ORDER BY employee_id ASC;

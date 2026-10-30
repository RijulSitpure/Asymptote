WITH HallEventsWithIsNewEvent AS (
    SELECT 
        hall_id, 
        start_day, 
        end_day,
        CASE 
            WHEN start_day > MAX(end_day) OVER (
                PARTITION BY hall_id 
                ORDER BY start_day, end_day DESC 
                ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
            ) THEN 1 
            ELSE 0 
        END AS is_new_event
    FROM HallEvents
),
HallEventsWithGroupId AS (
    SELECT 
        hall_id, 
        start_day, 
        end_day,
        SUM(is_new_event) OVER (
            PARTITION BY hall_id 
            ORDER BY start_day, end_day DESC
            ROWS UNBOUNDED PRECEDING
        ) AS group_id
    FROM HallEventsWithIsNewEvent
)
SELECT 
    hall_id, 
    MIN(start_day) AS start_day, 
    MAX(end_day) AS end_day
FROM HallEventsWithGroupId
GROUP BY hall_id, group_id;

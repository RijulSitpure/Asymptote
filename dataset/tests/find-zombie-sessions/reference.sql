SELECT 
    session_id,
    user_id,
    start_time,
    end_time,
    activity_count
FROM Sessions
WHERE activity_count = 0
   OR TIMESTAMPDIFF(HOUR, start_time, end_time) >= 24
ORDER BY session_id ASC;

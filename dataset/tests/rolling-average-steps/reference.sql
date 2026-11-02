SELECT 
    s1.user_id,
    s1.steps_date,
    ROUND((s1.steps_count + s2.steps_count + s3.steps_count) / 3.0, 2) AS rolling_average
FROM Steps s1
JOIN Steps s2 ON s1.user_id = s2.user_id AND DATEDIFF(s1.steps_date, s2.steps_date) = 1
JOIN Steps s3 ON s1.user_id = s3.user_id AND DATEDIFF(s1.steps_date, s3.steps_date) = 2
ORDER BY s1.user_id ASC, s1.steps_date ASC;

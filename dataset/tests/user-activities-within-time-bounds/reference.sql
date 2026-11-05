WITH T AS (
    SELECT
        user_id,
        session_start,
        LAG(session_end) OVER (PARTITION BY user_id, session_type ORDER BY session_start) AS prev_end
    FROM Sessions
)
SELECT DISTINCT user_id
FROM T
WHERE TIMESTAMPDIFF(SECOND, prev_end, session_start) BETWEEN 0 AND 43200
ORDER BY user_id;

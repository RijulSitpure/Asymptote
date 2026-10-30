WITH AllCalls AS (
    SELECT caller_id AS user_id, recipient_id AS other_id, call_time FROM Calls
    UNION ALL
    SELECT recipient_id AS user_id, caller_id AS other_id, call_time FROM Calls
),
RankedCalls AS (
    SELECT
        user_id,
        other_id,
        DATE(call_time) AS call_date,
        ROW_NUMBER() OVER (PARTITION BY user_id, DATE(call_time) ORDER BY call_time ASC) AS rnk_first,
        ROW_NUMBER() OVER (PARTITION BY user_id, DATE(call_time) ORDER BY call_time DESC) AS rnk_last
    FROM AllCalls
)
SELECT DISTINCT
    r1.user_id
FROM RankedCalls r1
JOIN RankedCalls r2
    ON r1.user_id = r2.user_id
    AND r1.call_date = r2.call_date
    AND r1.rnk_first = 1
    AND r2.rnk_last = 1
WHERE r1.other_id = r2.other_id;

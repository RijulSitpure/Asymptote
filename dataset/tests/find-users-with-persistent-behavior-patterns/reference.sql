WITH RankedActions AS (
    SELECT
        user_id,
        action_date,
        DATEDIFF(action_date, '2000-01-01') - 
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY action_date) AS grp
    FROM (
        SELECT DISTINCT user_id, action_date
        FROM UserActions
    ) distinct_actions
),
GroupCounts AS (
    SELECT
        user_id,
        COUNT(*) AS streak_days
    FROM RankedActions
    GROUP BY user_id, grp
)
SELECT DISTINCT user_id
FROM GroupCounts
WHERE streak_days >= 3
ORDER BY user_id ASC;

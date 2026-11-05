WITH AllFriends AS (
    SELECT user_id1 AS u1, user_id2 AS u2 FROM Friends
    UNION ALL
    SELECT user_id2 AS u1, user_id1 AS u2 FROM Friends
),
Mutual AS (
    SELECT a.u1, b.u1 AS u2
    FROM AllFriends a
    JOIN AllFriends b ON a.u2 = b.u2 AND a.u1 != b.u1
)
SELECT f.user_id1, f.user_id2
FROM Friends f
LEFT JOIN Mutual m ON f.user_id1 = m.u1 AND f.user_id2 = m.u2
WHERE m.u1 IS NULL
ORDER BY f.user_id1, f.user_id2;

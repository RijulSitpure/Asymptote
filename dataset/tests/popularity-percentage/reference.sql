WITH CombinedFriends AS (
    SELECT user1, user2 FROM Friends
    UNION
    SELECT user2 AS user1, user1 AS user2 FROM Friends
),
TotalUsers AS (
    SELECT COUNT(DISTINCT user1) AS cnt FROM CombinedFriends
)
SELECT 
    cf.user1,
    ROUND(COUNT(cf.user2) * 100.0 / (SELECT cnt FROM TotalUsers), 2) AS percentage_popularity
FROM CombinedFriends cf
GROUP BY cf.user1
ORDER BY cf.user1 ASC;

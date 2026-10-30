WITH AllFriends AS (
    SELECT user1_id AS u1, user2_id AS u2 FROM Friendship
    UNION ALL
    SELECT user2_id AS u1, user1_id AS u2 FROM Friendship
)
SELECT
    f.user1_id,
    f.user2_id,
    COUNT(af1.u2) AS common_friend
FROM Friendship f
JOIN AllFriends af1
    ON f.user1_id = af1.u1
JOIN AllFriends af2
    ON f.user2_id = af2.u1
    AND af1.u2 = af2.u2
GROUP BY f.user1_id, f.user2_id
HAVING COUNT(af1.u2) >= 3;
